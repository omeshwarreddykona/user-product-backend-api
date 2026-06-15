const authSwagger = {
  "/register": {
    post: {
      tags: ["Auth Service"],
      summary: "Register a new user",
      description:
        "Creates a new user account after validating name, email, password strength, and confirm password. Password is hashed using bcrypt before saving.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name", "email", "password", "confirm_password"],
              properties: {
                name: {
                  type: "string",
                  example: "Omeshwar Reddy",
                },
                email: {
                  type: "string",
                  example: "omeshwar@example.com",
                },
                password: {
                  type: "string",
                  example: "Password@123",
                  description:
                    "Password must contain uppercase, lowercase, symbol, at least 3 digits, minimum 6 characters, and no spaces.",
                },
                confirm_password: {
                  type: "string",
                  example: "Password@123",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "User registered successfully",
          content: {
            "application/json": {
              example: {
                success: true,
                message: "User signin successfully",
              },
            },
          },
        },
        422: {
          description: "Validation error or user already exists",
          content: {
            "application/json": {
              examples: {
                nameRequired: {
                  value: {
                    code: 422,
                    message: "Please Enter Name",
                  },
                },
                invalidEmail: {
                  value: {
                    code: 422,
                    message: "User already existed, Please change your email",
                  },
                },
                invalidPassword: {
                  value: {
                    code: 422,
                    message: "Please enter the correct password",
                  },
                },
                passwordMismatch: {
                  value: {
                    code: 422,
                    message: "Password and confirm password are not matched",
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  "/login": {
    post: {
      tags: ["Auth Service"],
      summary: "Login user",
      description:
        "Authenticates user email and password. If credentials are valid, returns a JWT token valid for 7 days.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email", "password"],
              properties: {
                email: {
                  type: "string",
                  example: "omeshwar@example.com",
                },
                password: {
                  type: "string",
                  example: "Password@123",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "User login successfully",
          content: {
            "application/json": {
              example: {
                code: 200,
                message: "User login successfully",
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
              },
            },
          },
        },
        400: {
          description: "Invalid login input or invalid credentials",
          content: {
            "application/json": {
              examples: {
                emailRequired: {
                  value: {
                    code: 400,
                    message: "Please enter the Email",
                  },
                },
                passwordRequired: {
                  value: {
                    code: 400,
                    message: "Please enter the password",
                  },
                },
                userNotFound: {
                  value: {
                    code: 400,
                    message: "User not found!",
                  },
                },
                wrongPassword: {
                  value: {
                    code: 400,
                    message: "Password was wrong,please try again",
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  "/logout": {
    post: {
      tags: ["Auth Service"],
      summary: "Logout user",
      description:
        "Logs out the user by adding the JWT token to the blacklist. Requires Bearer token in Authorization header.",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: "User logout successfully",
          content: {
            "application/json": {
              example: {
                success: true,
                message: "User logout successfully",
              },
            },
          },
        },
        400: {
          description: "Token missing",
          content: {
            "application/json": {
              example: {
                success: false,
                message: "Token required!",
              },
            },
          },
        },
        500: {
          description: "Logout server error",
          content: {
            "application/json": {
              example: {
                success: false,
                message: "Something went wrong while loggingout",
              },
            },
          },
        },
      },
    },
  },

  "/verify-token": {
    get: {
      tags: ["Auth Service"],
      summary: "Verify JWT token",
      description:
        "Validates the JWT token from Authorization header. Useful for checking whether the current user session is active.",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: "Token validated successfully",
          content: {
            "application/json": {
              example: {
                success: true,
                message: "Token validated successfully",
              },
            },
          },
        },
        401: {
          description: "Token missing, blacklisted, or invalid",
          content: {
            "application/json": {
              examples: {
                tokenMissing: {
                  value: {
                    success: false,
                    message: "Token missing or Invalid token",
                  },
                },
                tokenBlacklisted: {
                  value: {
                    success: false,
                    message: "Token has been loggedout, login again",
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  "/user-to-admin/{id}": {
    put: {
      tags: ["Auth Service"],
      summary: "Activate or deactivate admin role",
      description:
        "Changes a user's role based on isactive value. If isactive is true, role becomes admin. If false, role becomes user. Admin access is required.",
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          example: "65f1a2b3c4d5e6f789012345",
          description: "MongoDB User ObjectId",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["isactive"],
              properties: {
                isactive: {
                  type: "boolean",
                  example: true,
                  description:
                    "true converts user to admin, false converts admin back to user.",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "User role changed successfully",
          content: {
            "application/json": {
              example: {
                success: true,
                message: "User role is changed",
              },
            },
          },
        },
        400: {
          description: "No changes applied",
          content: {
            "application/json": {
              example: {
                success: false,
                message: "No changes applied",
              },
            },
          },
        },
        401: {
          description: "User not found or unauthorized",
          content: {
            "application/json": {
              example: {
                success: false,
                message: "User not found",
              },
            },
          },
        },
        403: {
          description: "Admin access required",
          content: {
            "application/json": {
              example: {
                success: false,
                message: "Access denied. Admin only.",
              },
            },
          },
        },
        500: {
          description: "Server error",
          content: {
            "application/json": {
              example: {
                success: false,
                message: "Something went wrong",
              },
            },
          },
        },
      },
    },
  },
};

export default authSwagger;