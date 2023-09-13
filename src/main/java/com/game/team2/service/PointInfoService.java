package com.game.team2.service;

import org.springframework.stereotype.Service;

import com.game.team2.mapper.PointInfoMapper;
import com.game.team2.vo.PointInfoVO;

@Service
public class PointInfoService {

    private final PointInfoMapper pointInfoMapper;

    public PointInfoService(PointInfoMapper pointInfoMapper) {
        this.pointInfoMapper = pointInfoMapper;
    }

    public PointInfoVO selectPointInfo(int uiNum, int giNum) {
        return pointInfoMapper.selectPointInfo(uiNum, giNum);
    }

    public int insertPointInfo(PointInfoVO pointInfoVO) {
        return pointInfoMapper.insertPointInfo(pointInfoVO);
    }

    public int updatePointInfo(PointInfoVO pointInfoVO) {
        return pointInfoMapper.updatePointInfo(pointInfoVO);
    }
}
