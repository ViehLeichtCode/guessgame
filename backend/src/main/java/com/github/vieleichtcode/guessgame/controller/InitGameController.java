package com.github.vieleichtcode.guessgame.controller;

import com.github.vieleichtcode.guessgame.dto.*;
import com.github.vieleichtcode.guessgame.services.SseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class InitGameController {
    private final SseService sseService;

    public InitGameController(SseService sseService) {
        this.sseService = sseService;
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getCategories() {
        List<Category> categories = new ArrayList<>();
        categories.add(new Category(1L, "Category 1"));
        categories.add(new Category(2L, "Category 2"));
        categories.add(new Category(3L, "Category 3"));
        categories.add(new Category(4L, "Category 4"));
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(categories);
    }

    @PostMapping("/create-game")
    public ResponseEntity<CreateGameResult> createGame(@RequestBody CreateGameRequest createGameRequest) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new CreateGameResult("JGDJDEDD"));
    }

    @PostMapping("/join-game")
    public ResponseEntity<JoinGameResult> joinGame(@RequestBody JoinGameRequest joinGameRequest) {
        JoinGameResult joinGameResult = new JoinGameResult(3123, List.of(
                new Player(3123, joinGameRequest.player_name(), 0),
                new Player(3124, "Player 2", 0),
                new Player(3125, "Player 3", 0),
                new Player(3126, "Player 4", 0),
                new Player(3127, "Player 5", 0)
        ));
        this.sseService.sendEvent("PLAYER_JOINED",
                new Player(3213, joinGameRequest.player_name(), 0)
        );
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(joinGameResult);
    }

    @PostMapping("/start-game")
    public ResponseEntity<Void> startGame() {
        Question currentQuestion = new Question(1, "Was ist dein Traumberuf?", 3123, List.of(
                new QuestionOptions(1, "Sonnenstudio"),
                new QuestionOptions(2, "Rotlicht Viertel"),
                new QuestionOptions(3, "Schweiß Riecher")
        ));
        this.sseService.sendEvent("NEXT_QUESTION", currentQuestion);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
