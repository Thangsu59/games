package com.game.team2.mapper;

import java.util.List;

import com.game.team2.vo.GameInfoVO;

public interface GameInfoMapper {
    
    List<GameInfoVO> selectGameInfos(GameInfoVO game); 
    GameInfoVO selectGameInfo(int giNum);

}
