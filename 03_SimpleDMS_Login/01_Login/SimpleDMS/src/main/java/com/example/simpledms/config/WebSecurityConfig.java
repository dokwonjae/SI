package com.example.simpledms.config;

import com.example.simpledms.security.jwt.AuthEntryPointJwt;
import com.example.simpledms.security.jwt.AuthTokenFilter;
import com.example.simpledms.security.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
// 스프링 시큐리티 권한체크 방법 3가지 : 1가지(제일 무난한 권한체크 어노테이션)
@EnableGlobalMethodSecurity(
        prePostEnabled = true)
public class WebSecurityConfig { // extends WebSecurityConfigurerAdapter {
    @Autowired
    UserDetailsServiceImpl userDetailsService;  // DB 조회 함수 객체

    @Autowired
    private AuthEntryPointJwt unauthorizedHandler; // 비인증/권한체크 예외처리 객체

    //  JWT 토큰 필터 객체 생성
    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    //  DB 에서 가져온 정보와 input 된 정보를 비교하는 함수
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        //  db에서 가져온 정보와 리액트에서 전송한 유저 정보를 비교하는 객체
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(userDetailsService); // DB 유저 조회 함수 객체
        authProvider.setPasswordEncoder(passwordEncoder()); // 암호 적용된 페스워드

        return authProvider;
    }

    //  AuthenticationManager 를 클래스 외부에서 사용하기 위해
//  아래 함수 정의 않하면 @Autodwired 로 가져올 때 에러가 발생할 수 있음
//  다른 클래스(객체)에서 AuthenticationManager 사용하고자 할때 @Autowired 로 객체 사용가능해서 편의성이 향상됨
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    //  패스워드 암호화 함수
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /*
     * 스프링 시큐리티 룰을 무시하게 하는 Url 규칙(여기 등록하면 규칙 적용하지 않음)
     */
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().antMatchers("/js/**", "/images/**", "/css/**");
    }

    //  todo: 스프링 시큐리티 규칙을 무시하게 하는 Url 규칙(여기 등록하면 규칙 적용하지 않음)
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors()
                .and(). // 연결
                csrf().disable() // 1) csrf(해킹공격: 쿠키) 보안 비활성화
                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and() // 2) 인증 예외처리는 AuthEntryPointJwt
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()// 3) 세션안쓰고(stateful) JWT 사용 예정
                .authorizeRequests()
                .antMatchers("/api/auth/**").permitAll() // 4) todo: 이 url 은 모든 사용자 접근 허용
                .antMatchers("/api/admin/**").hasRole("ADMIN") // 5) todo: admin 메뉴는 ROLE_ADMIN 만 가능
                .antMatchers("/api/**").permitAll() // 이 6) todo:  url 은 모든 사용자 접근 허용
                .anyRequest().authenticated(); // 7) todo: 그외 url은 모든 사용자, 모든 접속에 대해서 인증이 필요하다는 걸 의미

        http.authenticationProvider(authenticationProvider()); // DB와 입력값(id, pwd) 비교

//        todo: 웹토큰 필터 끼워넣기 : http.addFilterBefore(필터_1, 필터_2) : 필터_2 앞에 필터_1을 끼여넣기
        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class); // JWT 토큰 필터 적용

        return http.build();
    }
}