package com.game.team2;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@SpringBootApplication
@MapperScan
@ServletComponentScan
public class Team2Application {

	public static void main(String[] args) {
		SpringApplication.run(Team2Application.class, args);
	}

}
