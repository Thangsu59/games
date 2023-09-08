package com.game.team2.controller.common;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TemplateController {
    @GetMapping("/tmpl/**")
    public void goPage(){
    }

    @GetMapping("/")
    public String home(){
        return "index";
    }
}
