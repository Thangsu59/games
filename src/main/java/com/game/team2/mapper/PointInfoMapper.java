package com.game.team2.mapper;

import com.game.team2.vo.PointInfoVO;

public interface PointInfoMapper {
    PointInfoVO selectPointInfo(int uiNum, int giNum);

    int insertPointInfo(PointInfoVO point);

    int updatePointInfo(PointInfoVO point);
}
