package com.github.vieleichtcode.guessgame.controller;

import com.github.vieleichtcode.guessgame.services.SseService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@CrossOrigin(origins = "*")
public class EventController {
    private final SseService sseService;

    public EventController(SseService sseService) {
        this.sseService = sseService;
    }

    @GetMapping(value = "/events", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter stream() {
        return this.sseService.createEmitter();
    }
}
