package com.game.team2.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.game.team2.service.RandomWordService;
import com.game.team2.vo.WordsVO;

@RestController
public class RandomWordController {
    
    @Autowired
    private RandomWordService randomWordService;
    @GetMapping("/random-words")
    public WordsVO getRandomWords() throws JsonMappingException, JsonProcessingException{
        return randomWordService.getRandomWords();
    }
}
