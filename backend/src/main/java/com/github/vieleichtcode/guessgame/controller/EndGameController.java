package com.github.vieleichtcode.guessgame.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EndGameController {
    @PostMapping("/end-game")
    public ResponseEntity<Void> endGame() {
        return ResponseEntity.ok().build();
    }
}
