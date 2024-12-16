package com.here.faq.backend.controller;

import com.here.faq.backend.service.EmbeddingService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin("*")
public class ChatController {

    private final EmbeddingService embeddingService;

    public ChatController(EmbeddingService embeddingService) {
        this.embeddingService = embeddingService;
    }

    @PostMapping("/upload")
    public void uploadPdf(@RequestParam("file") MultipartFile file) {
        embeddingService.processAndStorePdf(file);
    }

    @GetMapping("/ask")
    public String askQuestion(@RequestParam("question") String question) {
        return embeddingService.askQuestion(question);
    }

    //    @GetMapping(value = "/ask/stream", produces = "text/event-stream")
//    public Flux<String> askQuestionStream(@RequestParam("question") String question) {
//        return embeddingService.askQuestionStream(question);
//    }


    @GetMapping(value = "/ask/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> askQuestionStream(@RequestParam("question") String question) {
        try {
            if (question == null || question.trim().isEmpty()) {
                return Flux.error(new IllegalArgumentException("Question parameter must not be null or empty"));
            }
            return embeddingService.askQuestionStream(question);
//                    .doOnSubscribe(subscription -> {
//                        System.out.println("Streaming started for question: " + question);
//                    })
//                    .doOnNext(data -> {
//                        System.out.println("Streaming chunk: " + data);
//                    })
//                    .doOnError(error -> {
//                        System.err.println("Error during streaming: " + error.getMessage());
//                    })
//                    .doOnComplete(() -> {
//                        System.out.println("Streaming completed for question: " + question);
//                    });
        } catch (Exception e) {
            System.err.println("Unexpected error: " + e.getMessage());
            return Flux.error(new RuntimeException("An unexpected error occurred while processing the request"));
        }
    }
}