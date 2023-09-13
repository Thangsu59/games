package com.game.team2.controller;

import com.game.team2.service.PointInfoService;
import com.game.team2.vo.PointInfoVO;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/point-info")
public class PointInfoController {

    private final PointInfoService pointInfoService;

    public PointInfoController(PointInfoService pointInfoService) {
        this.pointInfoService = pointInfoService;
    }

    @GetMapping("/select/{uiNum}/{giNum}")
    public PointInfoVO selectPointInfo(@PathVariable int uiNum, @PathVariable int giNum) {
        return pointInfoService.selectPointInfo(uiNum, giNum);
    }

    @PostMapping("/insert")
    public int insertPointInfo(@RequestBody PointInfoVO pointInfoVO) {
        return pointInfoService.insertPointInfo(pointInfoVO);
    }

    @PostMapping("/update")
    public int updatePointInfo(@RequestBody PointInfoVO pointInfoVO) {
        return pointInfoService.updatePointInfo(pointInfoVO);
    }
}
