package com.game.team2.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.game.team2.mapper.PointInfoMapper;
import com.game.team2.vo.PointInfoVO;

@Service
public class PointInfoService {
    @Autowired
    private PointInfoMapper pointInfoMapper;

    public int addPointInfo(PointInfoVO point) {
        return pointInfoMapper.addPointInfo(point);
    }

    public PointInfoVO selectMaxPoint(PointInfoVO point) {
        return pointInfoMapper.selectMaxPoint(point);
    }

    public PointInfoVO selectGameMax(PointInfoVO point) {
        return pointInfoMapper.selectGameMax(point);
    }

    public List<PointInfoVO> selectPointRank(PointInfoVO point) {
        return pointInfoMapper.selectPointRank(point);
    }
}
