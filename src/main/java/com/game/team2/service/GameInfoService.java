package com.game.team2.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.game.team2.mapper.GameInfoMapper;
import com.game.team2.vo.GameInfoVO;

@Service
public class GameInfoService {
    @Autowired
    private GameInfoMapper gameMapper;
	public List<GameInfoVO> getGameInfos(GameInfoVO game){
		return gameMapper.selectGameInfos(game);
	}

	public GameInfoVO getGameInfo(int giNum) {
		return gameMapper.selectGameInfo(giNum);
    }

}
