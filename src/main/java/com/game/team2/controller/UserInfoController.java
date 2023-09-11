package com.game.team2.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.game.team2.service.UserInfoService;
import com.game.team2.vo.MsgVO;
import com.game.team2.vo.UserInfoVO;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class UserInfoController {
    @Autowired
    private UserInfoService userService;

    @GetMapping("/user-infos")
    public List<UserInfoVO> getUserInfos(UserInfoVO user) {

        return userService.getUserInfos(user);
    }

    @GetMapping("/user-infos/{uiNum}")
    public UserInfoVO getUserInfo(@PathVariable int uiNum) {
        log.info("uiNum=>{}", uiNum);
        return userService.getUserInfo(uiNum);
    }

    @PostMapping("/insertUserInfo")
    public MsgVO insertUserInfo(@RequestBody UserInfoVO user) {
        MsgVO msg = new MsgVO();
        int result = userService.insertUserInfo(user);
        if (result > 0) {
            msg.setMsg("사용자 정보가 추가되었습니다.");
            msg.setSuccess(true);
        } else {
            msg.setMsg("사용자 정보 추가에 실패했습니다.");
        }
        return msg;
    }

    @PostMapping("/updateUserInfo")
    public MsgVO updateUserInfo(@RequestBody UserInfoVO user) {
        MsgVO msg = new MsgVO();
        int result = userService.updateUserInfo(user);
        if (result > 0) {
            msg.setMsg("사용자 정보가 수정되었습니다.");
            msg.setSuccess(true);
        } else {
            msg.setMsg("사용자 정보 수정에 실패했습니다.");
        }
        return msg;
    }

    @PostMapping("/deleteUserInfo/{uiNum}")
    public MsgVO deleteUserInfo(@PathVariable int uiNum) {
        MsgVO msg = new MsgVO();
        int result = userService.deleteUserInfo(uiNum);
        if (result > 0) {
            msg.setMsg("사용자 정보가 삭제되었습니다.");
            msg.setSuccess(true);
        } else {
            msg.setMsg("사용자 정보 삭제에 실패했습니다.");
        }
        return msg;
    }

    @PostMapping("/login")
    public MsgVO login(@RequestBody UserInfoVO user, MsgVO msg, HttpSession session) {
        log.info("user=>{}", user);
        UserInfoVO loginUser = userService.login(user);
        msg.setMsg("아이디나 비밀번호를 확인하세요");
        if (loginUser != null) {
            session.setAttribute("user", loginUser);
            msg.setMsg("로그인이 성공하였습니다.");
            msg.setUrl("/");
            msg.setSuccess(true);
        }
        return msg;
    }
}
