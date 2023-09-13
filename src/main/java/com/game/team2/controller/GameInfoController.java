package com.game.team2.controller;

import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.RestController;

import com.game.team2.service.GameInfoService;
import com.game.team2.vo.GameInfoVO;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class GameInfoController {
    @Autowired
    private GameInfoService gameService;

    @GetMapping("/game-infos")
    public List<GameInfoVO> getGameInfos(GameInfoVO game) {
        return gameService.getGameInfos(game);
    }

    @GetMapping("/game-infos/{giNum}")
    public GameInfoVO getGameInfo(@PathVariable int giNum) {
        log.info("giNum=>{}", giNum);
        return gameService.getGameInfo(giNum);
    }

    
}
