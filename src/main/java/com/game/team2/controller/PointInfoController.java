package com.game.team2.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.game.team2.service.PointInfoService;
import com.game.team2.vo.MsgVO;
import com.game.team2.vo.PointInfoVO;
import com.game.team2.vo.UserInfoVO;

@RestController
public class PointInfoController {

    @Autowired
    private PointInfoService pointInfoService;

    @PostMapping("/point-infos")
    public MsgVO  addPointInfo(@RequestBody PointInfoVO point, MsgVO msg) {
        msg.setMsg("점수 저장에 실패하였습니다.");
        if(pointInfoService.addPointInfo(point)==1) {
            msg.setMsg("점수 저장 성공");
            msg.setSuccess(true);
        }
        return msg;
    }

    @GetMapping("/point-infos/max")
    public PointInfoVO getMaxPointInfo(PointInfoVO point, HttpSession session) {
        UserInfoVO user = (UserInfoVO) session.getAttribute("user");
        point.setUiNum(user.getUiNum());
        return pointInfoService.selectMaxPoint(point);
    }

    @GetMapping("/point-infos/rank")
    public List<PointInfoVO> getRankInfo(PointInfoVO point) {
        return pointInfoService.selectPointRank(point);
    }
    
}
