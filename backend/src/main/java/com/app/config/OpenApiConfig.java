package com.app.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI arthasarthiOpenAPI() {

        return new OpenAPI()

                .info(
                        new Info()

                                .title(
                                        "ArthaSarthi API"
                                )

                                .description(
                                        "AI-powered personal finance management backend built using Spring Boot and FastAPI"
                                )

                                .version(
                                        "1.0.0"
                                )

                                .contact(
                                        new Contact()

                                                .name(
                                                        "Rishabh Srivastava"
                                                )

                                                .email(
                                                        "rishabhsrivastavarex@gmail.com"
                                                )
                                )

                                .license(
                                        new License()

                                                .name(
                                                        "MIT License"
                                                )
                                )
                )

                .externalDocs(
                        new ExternalDocumentation()

                                .description(
                                        "Project Documentation"
                                )
                );
    }
}