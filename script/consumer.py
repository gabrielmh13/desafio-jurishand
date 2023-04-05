import requests
import json
import csv
import sys


def help():
    print("\nHow to Use:\n\npython consumer.py http://localhost:3333/artigos\n\n")

def generateArticleStats(data):
    authorStats = {}
    
    # Percorre cada artigo no JSON
    for article in data:
        author = article['author']
        category = article['category']
        wordCount = len(article['content'].split())
        
        # Atualiza a quantidade de artigos por categoria
        if author not in authorStats:
            authorStats[author] = {'articles_per_category': {category: 1}, 'total_articles': 1, 'total_words': wordCount}
        else:
            authorStats[author]['total_articles'] += 1
            authorStats[author]['total_words'] += wordCount
            
            if category in authorStats[author]['articles_per_category']:
                authorStats[author]['articles_per_category'][category] += 1
            else:
                authorStats[author]['articles_per_category'][category] = 1
    
    # Calcula a média de palavras por artigo por autor
    for author in authorStats:
        authorStats[author]['avg_words'] = authorStats[author]['total_words'] / authorStats[author]['total_articles']
    
    return authorStats

def generateReport(authorStats, outputFile):
    categoriesHeader = []

    # Obtem a lista de categorias
    categories = set()
    for author in authorStats:
        categories.update(authorStats[author]['articles_per_category'].keys())
    
    # Ordena as categorias alfabeticamente
    categories = sorted(list(categories))
        
    # Ajustar nome da coluna
    for category in categories:
        categoriesHeader.append("Categoria " + category)

    # Cria o cabeçalho do CSV
    header = ['Autor'] + categoriesHeader + ['Total Artigos', 'Media Palavras']
    
    # Abre o arquivo de saída
    with open(outputFile, 'w', newline='', encoding='utf-8') as file:
        # Cria o escritor CSV
        writer = csv.writer(file, delimiter=';')
        
        # Escreve o cabeçalho
        writer.writerow(header)
        
        # Escreve as estatísticas para cada autor
        for author in sorted(authorStats.keys()):
            stats = authorStats[author]
            row = [author]
            
            # Adiciona a quantidade de artigos por categoria
            for category in categories:
                if category in stats['articles_per_category']:
                    row.append(stats['articles_per_category'][category])
                else:
                    row.append(0)
            
            # Adiciona a quantidade total de artigos e a média de palavras por artigo
            row.append(stats['total_articles'])
            row.append("{:.2f}".format(stats['avg_words']))
            
            # Escreve a linha no CSV
            writer.writerow(row)


if __name__ == "__main__":

    if len(sys.argv) < 2:
        help()
        sys.exit(0)

    try:
        r = requests.get(sys.argv[1])
    except:
        print("Erro ao realizar requisição!")
        sys.exit(1)

    if r.status_code == 200:
        articles = json.loads(r.text)

        stats = generateArticleStats(articles)
        generateReport(stats, "report-articles.csv")
        

        print("Geração de relatório finalizada!")
    