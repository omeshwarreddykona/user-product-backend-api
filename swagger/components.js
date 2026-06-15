export const components = {
    securitySchemes: {
        bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            description:
                "Paste JWT token only. Do not type Bearer manually. Swagger will add Bearer automatically.",
        },
    },

    schemas: {
        SuccessResponse: {
            type: "object",
            properties: {
                code: {
                    type: "integer",
                    example: 200,
                },
                message: {
                    type: "string",
                    example: "Operation completed successfully",
                },
            },
        },

        ErrorResponse: {
            type: "object",
            properties: {
                code: {
                    type: "integer",
                    example: 400,
                },
                message: {
                    type: "string",
                    example: "Validation error",
                },
            },
        },

        AuthErrorResponse: {
            type: "object",
            properties: {
                success: {
                    type: "boolean",
                    example: false,
                },
                message: {
                    type: "string",
                    example: "Token missing or Invalid token",
                },
            },
        },
    },
};
