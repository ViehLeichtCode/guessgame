package com.github.vieleichtcode.guessgame.controller;

import com.github.vieleichtcode.guessgame.dto.*;
import com.github.vieleichtcode.guessgame.services.SseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/current-question")
public class ActiveGameController {
    private final SseService sseService;

    public ActiveGameController(SseService sseService) {
        this.sseService = sseService;
    }

    @PostMapping("/submit-answer")
    public ResponseEntity<Void> submitAnswer(@RequestBody Answer answer) {
        Results results = new Results(1, 2, List.of(
                new AnswerResult(3124, 3, false, 0, 50),
                new AnswerResult(3123, 3, true, 999999990, 1000000000),
                new AnswerResult(3125, 2, true, 150, 150),
                new AnswerResult(3126, 1, false, 0, 100)
        ));
        this.sseService.sendEvent("ALL_PLAYERS_ANSWERED", results);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/next")
    public ResponseEntity<Void> nextQuestion() {
        Question currentQuestion = new Question(2, "Was würdest du am liebsten Essen?", 3124, List.of(
                new QuestionOptions(4, "NHFbuibwtgn"),
                new QuestionOptions(5, "Griechisch"),
                new QuestionOptions(6, "Marrokkanisch")
        ));
        this.sseService.sendEvent("NEXT_QUESTION", currentQuestion);
        return ResponseEntity.ok().build();
    }
}
