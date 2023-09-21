package com.game.team2.mapper;

import java.util.List;

import com.game.team2.vo.PointInfoVO;

public interface PointInfoMapper {
    PointInfoVO selectMaxPoint(PointInfoVO point);

    PointInfoVO selectGameMax(PointInfoVO point);
    
    List<PointInfoVO> selectPointRank(PointInfoVO point);

    int addPointInfo(PointInfoVO point);

    

}
