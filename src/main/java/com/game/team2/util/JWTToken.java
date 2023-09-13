package com.game.team2.util;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JWTToken {

    private final String JWT_TOKEN_KEY;
    private final long JWT_TOKEN_EXPIRE;

    public JWTToken(@Value("${jwt.token.key}") String jwtTokenKey, @Value("${jwt.token.expire}") long jwtTokenExpire) {
        this.JWT_TOKEN_KEY = jwtTokenKey;
        JWT_TOKEN_EXPIRE = jwtTokenExpire;
    }

    public String getJwtTokenKey() {
        return JWT_TOKEN_KEY;
    }

    public long getJwtTokenExpire() {
        return JWT_TOKEN_EXPIRE;
    }

    public String getToken(String uiId) {
        Date date = new Date();
        long expireDate = date.getTime() + JWT_TOKEN_EXPIRE;

        Key key = Keys.hmacShaKeyFor(JWT_TOKEN_KEY.getBytes());
        log.info("key=>{}", key);
        String token = Jwts.builder()
                .setSubject(uiId)
                .setIssuedAt(date)
                .setExpiration(new Date(expireDate))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

        return token;
    }

    public String getUserIdFromToken(String token) {
        Key key = Keys.hmacShaKeyFor(JWT_TOKEN_KEY.getBytes());
        try {
            String userId = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
            return userId;
        } catch (ExpiredJwtException eje) {
            log.error("Token has expired");
            throw eje;
        } catch (SignatureException se) {
            log.error("Invalid token signature");
            throw se;
        }
    }
}
