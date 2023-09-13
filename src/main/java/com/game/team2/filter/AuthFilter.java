package com.game.team2.filter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.filter.GenericFilterBean;

import com.game.team2.util.JWTToken;
import com.game.team2.vo.UserInfoVO;

import lombok.extern.slf4j.Slf4j;

@WebFilter(value = { "/*" })
@Slf4j
public class AuthFilter extends GenericFilterBean {
    @Autowired
    private JWTToken jwtToken;

    @Value("${auth.exclude.urls}")
    private List<String> excludeUrls = new ArrayList<>();

    {
        excludeUrls.add("/tmpl/user-info/login");
        excludeUrls.add("/tmpl/user-info/join");
        excludeUrls.add("/api/login");
        excludeUrls.add("/api/join");
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        if (request instanceof HttpServletRequest req && response instanceof HttpServletResponse res) {
            String uri = req.getRequestURI();
            if (!shouldExcludeUri(uri)) {
                HttpSession session = req.getSession();
                UserInfoVO user = (UserInfoVO) session.getAttribute("user");
                if (user == null) {
                    res.sendRedirect("/tmpl/user-info/login");
                    return;
                }
            }
        }
        chain.doFilter(request, response);
    }

    private boolean shouldExcludeUri(String uri) {
        for (String excludeUrl : excludeUrls) {
            if (uri.startsWith(excludeUrl) || uri.equals("/login") || uri.equals("/join")) {
                return true;
            }
        }
        return false;
    }
}
