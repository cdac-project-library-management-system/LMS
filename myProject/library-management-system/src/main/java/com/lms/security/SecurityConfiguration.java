package com.lms.security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration //equivalent to bean config xml
@EnableWebSecurity //to enable annotation support for spring sec
public class SecurityConfiguration {
	@Autowired
	private CustomJWTAuthenticationFilter customJWTAuthenticationFilter;
	
	private final String allowedOrigins = "${spring.web.cors.allowed-origins}";
	private final String allowedMethods = "${spring.web.cors.allowed-methods}";
	private final String allowedHeaders = "${spring.web.cors.allowed-headers}";
	
	// Configure the bean to customize spring security filter chain
	@Bean
	public SecurityFilterChain authorizeRequests(HttpSecurity http) throws Exception
	{
//		0. Enable CORS rules/configuration
		http.cors(cors -> cors.configurationSource(corsConfigurationSource()))
		//1. Disable CSRF filter
		.csrf(customizer -> customizer.disable())
		//2. configure URL based access
        .authorizeHttpRequests
        (request -> 
        request.requestMatchers("/**","/auth/login","/auth/register",
				"/v*/api-doc*/**","/swagger-ui/**").permitAll()
        //required explicitly for JS clients (eg React app - to permit pre flight requests)
       .requestMatchers(HttpMethod.OPTIONS).permitAll()
       .requestMatchers("/**")
       .hasRole("ADMIN")
       .requestMatchers("/books/**","/borrowRecords/**","/reservations/**","/reviews/**")
       .hasRole("USER")
       .anyRequest().authenticated())
//        .httpBasic(Customizer.withDefaults()) // - replacing it by custom JWT filter
        .sessionManagement(session 
        		-> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		//adding custom JWT filter before any auth filter
		http.addFilterBefore(customJWTAuthenticationFilter, 
				UsernamePasswordAuthenticationFilter.class);
        return http.build();
	}
	//to supply Auth Mgr , configure it as a spring bean
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception
	{
		return config.getAuthenticationManager();
	}
	
	@Bean
    public UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(allowedOrigins));
        configuration.setAllowedMethods(List.of(allowedMethods));
        configuration.setAllowedHeaders(List.of(allowedHeaders));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
