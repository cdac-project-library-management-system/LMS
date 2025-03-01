package com.lms.utils;

import java.security.Key;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;

import com.lms.security.CustomUserDetailsImpl;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtUtil {

	@Value("${spring.security.jwt.secret.key}")
	private String jwtSecret;

	@Value("${spring.security.jwt.exp.time}")
	private int jwtExpirationMs;
	
	private Key key;

	@PostConstruct
	public void init() {
		key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
	}

	public String generateJwtToken(Authentication authentication) {
		log.info("generate jwt token " + authentication);//contains verified user details
		CustomUserDetailsImpl userPrincipal = (CustomUserDetailsImpl) authentication.getPrincipal();
		return Jwts.builder()
				.setSubject((userPrincipal.getUsername()))
				.setIssuedAt(new Date())
				.setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
				.claim("authorities", getAuthoritiesInString(userPrincipal.getAuthorities()))
				.claim("user_id",userPrincipal.getUserEntity().getId())
				.signWith(key, SignatureAlgorithm.HS512)
				.compact();
	}

	public String getUserNameFromJwtToken(Claims claims) {
		return claims.getSubject();
	}

    public Claims validateJwtToken(String jwtToken) {
		Claims claims = Jwts.parserBuilder()
				.setSigningKey(key)
				.build()
				.parseClaimsJws(jwtToken)
				.getBody();
		/*
		 * parseClaimsJws - 
		 * throws:UnsupportedJwtException -if the JWT body | payload does not represent any Claims 
		 * JWSMalformedJwtException - if the JWT body | payload is not a valid 
		 * JWSSignatureException - if the JWT signature validation fails
		 * ExpiredJwtException - if the specified JWT is expired 
		 * IllegalArgumentException - if the JWT claims body | payload is null or empty or only whitespace
		 */
		return claims;		
	}
    
    // Helper method
    private String getAuthoritiesInString(Collection<? extends GrantedAuthority> authorities) {
		String authorityString = authorities.stream().
				map(authority -> authority.getAuthority())
				.collect(Collectors.joining(","));
		System.out.println(authorityString);
		return authorityString;
	}
    
    public Authentication populateAuthenticationTokenFromJWT(String jwt) {
		// validate JWT n retrieve JWT body (claims)
		Claims payloadClaims = validateJwtToken(jwt);
		// get user name from the claims
		String email = getUserNameFromJwtToken(payloadClaims);
		// get granted authorities as a custom claim
		List<GrantedAuthority> authorities = getAuthoritiesFromClaims(payloadClaims);
		// get userId as the custom claim		
		Long userId=getUserIdFromJwtToken(payloadClaims);
		// add user name/email , user id n  granted authorities in Authentication object
		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(email,userId,
				authorities);
		System.out.println("is authenticated "+token.isAuthenticated());//true
		return token;
		
	}
    
    public List<GrantedAuthority> getAuthoritiesFromClaims(Claims claims) {
		String authString = (String) claims.get("authorities");
		List<GrantedAuthority> authorities = AuthorityUtils.commaSeparatedStringToAuthorityList(authString);
		authorities.forEach(System.out::println);
		return authorities;
	}
    
    public Long getUserIdFromJwtToken(Claims claims) {
		return Long.valueOf((int)claims.get("user_id"));			
	}
    
}
