package com.example.guessgame.controller;

import com.example.guessgame.entity.Question;
import com.example.guessgame.repositorys.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    @Autowired
    private QuestionRepository repo;

    @GetMapping
    public List<Question> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Question create(@RequestBody Question q) {
        return repo.save(q);
    }
}
