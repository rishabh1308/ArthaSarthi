package com.app.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {

        return new OpenAPI()

                .servers(List.of(
                        new Server()
                                .url("https://arthasarthi-backend-production.up.railway.app")
                                .description("Production Server")
                ))

                .info(
                        new Info()
                                .title("ArthaSarthi API")
                                .version("1.0.0")
                                .description(
                                        "AI-powered personal finance management backend built using Spring Boot and FastAPI"
                                )
                                .contact(
                                        new Contact()
                                                .name("Rishabh Srivastava")
                                )
                );
    }
}