# Benötigte Funktionen

## Aktuelle Frage

Basierend auf der Anfrage (also dem User) wird die aktuelle Frage zurückgegeben.
In dieser Frage sollen auch die Antwortmöglichkeiten gespeichert werden

Eine Antwort könnte so aussehen:

```json
{
    "question": "Example",
    "id": 12345,
    "answers": [
      {
        "text": "Antwort 1",
        "id": 5678
      },
      {
        "text": "Antwort 2",
        "id": 5679
      },
      {
        "text": "Antwort 3",
        "id": 5680
      },
    ]
}
```

## Welcher Spieler soll gerade die Frage für sich selbst beantworten?

Darauf müssen alle Spieler zugreifen können. Gibt den Namen des aktuellen Spielers zurück

z.B.:

```json
{
    "name": "Spieler 1",
    "myTurn": false
}
```

## Eine Antwort übermitteln

Jeder muss auf seine Frage eine Antwort übermitteln können

Die Anfrage wäre dann ein POST mit

```json
{
  "question_id": 12345,
  "answer_id": 5678
}
```

## Eine Auswertung erhalten

Wer hat welche Antwort gegeben und welche Antwort war die richtige?

```json
{
  "active_player": "Spieler 1",
  "given_answer": "Antwort 1",
  "other_answers": [
    {
      "name": "Spieler 2",
      "answer": "Antwort 2",
      "correct": false
    },
    {
      "name": "Spieler 3",
      "answer": "Antwort 1",
      "correct": true
    }
  ],
  "scores": [
    {
      "name": "Spieler 2",
      "score": 450
    },
    {
      "name": "Spieler 1",
      "score": 150
    },
    {
      "name": "Spieler 3",
      "score": 950
    }
  ]
}
```

## Zur nächsten Frage gehen

Auch hier ein POST Request ohne Payload

##  Ein Spiel erstellen

Mit einem POST Request soll ein Spiel erstellt werden mit einer ID
Als Antwort wird die Spiel ID zurückgegeben die andere Spieler eingeben müssen

Im Request soll eine Optionale Liste von Kategorien übergeben werden können

```json
{
  "categories": [
    4567,
    4568
  ]
}
```


```json
{
  "id": "3DABJW12"
}
```

## Einem Spiel beitreten

Mit einem POST Request soll man dem Spiel beitreten können. Die ID kommt aus der Route

## Welche Kategorien von Fragen gibt es?

Ein Get Request liefert eine Liste von allen Fragen Kategorien die es gibt

z.B.:
```json
{
  "categories": [
    {
      "name": "Spiele",
      "id": 4567
    },
    {
      "name": "Filme",
      "id": 4568
    },
    {
      "name": "Musik",
      "id": 4569
    },
    {
      "name": "Geologie",
      "id": 4566
    },
  ]
}
```

# Vorgeschlagene Endpunkte

```text
/categories GET
/create-game POST
/join-game/:id POST
/current-question GET
/current-question/active-player GET
/current-question/answer POST
/current-question/results GET
/current-question/next POST
/end-game POST 
```