# Benötigte Funktionen

## Aktuelle Frage

Basierend auf der Anfrage (also dem User) wird die aktuelle Frage zurückgegeben.
In dieser Frage sollen auch die Antwortmöglichkeiten gespeichert werden

Eine Antwort könnte so aussehen:

```json
{
    "question": "Example",
    "id": 12345,
    "active_player": 312,
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

## Welche Spieler nehmen teil?

Welche Spieler sind bereits im Spiel, wenn der User beitritt? Weitere Beitritte werden via SSE mitgeteilt

`GET /players`

```json
{
  "players": [
    {
      "name": "Spieler 1",
      "id": 312
    },
    {
      "name": "Spieler 2",
      "id": 535
    }
  ]
}
```

## Eine Antwort übermitteln

Jeder muss auf seine Frage eine Antwort übermitteln können

Die Anfrage wäre dann ein POST mit

`POST /current-question/answer`
```json
{
  "question_id": 12345,
  "answer_id": 5678
}
```

## Eine Auswertung erhalten

Wer hat welche Antwort gegeben und welche Antwort war die richtige?

`GET /current-question/results`
```json
{
  "active_player": 134233,
  "given_answer": 5324534,
  "results": [
    {
      "answer_id": 423,
      "player_id": 54423,
      "correct": false,
      "reward": 0
    },
    {
      "answer_id": 53,
      "player_id": 6445,
      "correct": true,
      "reward": 50
    }
  ],
  "scores": [
    {
      "player_id": 6445,
      "score": 450
    },
    {
      "player_id": 563,
      "score": 150
    },
    {
      "player_id": 4235234,
      "score": 950
    }
  ]
}
```

## Zur nächsten Frage gehen

Auch hier ein POST Request ohne Payload
`POST /current-question/next`

##  Ein Spiel erstellen

Mit einem POST Request soll ein Spiel erstellt werden mit einer ID
Als Antwort wird die Spiel ID zurückgegeben die andere Spieler eingeben müssen

Im Request soll eine Optionale Liste von Kategorien übergeben werden können

`POST /create-game`
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

Ein Request würde so aussehen:
`POST /join-game/12345`
```json
{
  "player_name": "Spieler 1"
}
```
Die Antwort sollte so aussehen:
```json
{
  "player_id": 12345676
}
```

## Welche Kategorien von Fragen gibt es?

Ein Get Request liefert eine Liste von allen Fragen Kategorien die es gibt

z.B.:
`GET /categories`
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

## Spiel beenden

`POST /end-game`