const categorySwagger = {
  "/create-category": {
    post: {
      tags: ["Category Service"],
      summary: "Create a new category",
      description:
        "Creates a new category. Category name is required and duplicate category names are not allowed. The created_by field is taken from the authenticated user's email.",
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name"],
              properties: {
                name: {
                  type: "string",
                  example: "Electronics",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Category created successfully",
          content: {
            "application/json": {
              example: {
                code: 200,
                message: "Category name is created successfully",
              },
            },
          },
        },
        400: {
          description: "Validation error or category already exists",
          content: {
            "application/json": {
              examples: {
                nameRequired: {
                  value: {
                    code: 400,
                    message: "Please enter the category name",
                  },
                },
                alreadyExists: {
                  value: {
                    code: 400,
                    message: "The category is already exists",
                  },
                },
              },
            },
          },
        },
        401: {
          description: "Unauthorized or token missing",
          content: {
            "application/json": {
              example: {
                success: false,
                message: "Token missing or Invalid token",
              },
            },
          },
        },
        500: {
          description: "Server error",
          content: {
            "application/json": {
              example: {
                code: 500,
                message: "Something went wrong",
              },
            },
          },
        },
      },
    },
  },

  "/get-all-categories": {
    get: {
      tags: ["Category Service"],
      summary: "Get all categories",
      description:
        "Fetches all active categories where deleted_at is null. Supports pagination and category name search.",
      parameters: [
        {
          in: "query",
          name: "page",
          required: false,
          schema: {
            type: "integer",
            default: 1,
          },
          example: 1,
          description: "Page number for pagination",
        },
        {
          in: "query",
          name: "limit",
          required: false,
          schema: {
            type: "integer",
            default: 10,
          },
          example: 10,
          description: "Number of records per page",
        },
        {
          in: "query",
          name: "search",
          required: false,
          schema: {
            type: "string",
          },
          example: "electronics",
          description: "Search category by name",
        },
      ],
      responses: {
        200: {
          description: "Categories fetched successfully",
          content: {
            "application/json": {
              example: [
                {
                  _id: null,
                  docs: [
                    {
                      _id: "65f1a2b3c4d5e6f789012345",
                      name: "Electronics",
                      created_by: "omeshwar@example.com",
                      deleted_at: null,
                    },
                  ],
                  headers: {
                    total_count: 1,
                    total_pages: 1,
                    current_page: 1,
                    limit: 10,
                  },
                },
              ],
            },
          },
        },
        500: {
          description: "Server error",
          content: {
            "application/json": {
              example: {
                code: 500,
                message: "Something went wrong",
              },
            },
          },
        },
      },
    },
  },

  "/update-category/{id}": {
    put: {
      tags: ["Category Service"],
      summary: "Update category by ID",
      description:
        "Updates category data using MongoDB ObjectId. You can update the category name or any allowed category field.",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          example: "65f1a2b3c4d5e6f789012345",
          description: "MongoDB Category ObjectId",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  example: "Updated Electronics",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Category updated successfully",
          content: {
            "application/json": {
              example: {
                code: 200,
                message: "Catergory data is updated successfully",
              },
            },
          },
        },
        404: {
          description: "Category not found",
          content: {
            "application/json": {
              example: {
                code: 404,
                message: "Category not found",
              },
            },
          },
        },
        500: {
          description: "Server error",
          content: {
            "application/json": {
              example: {
                code: 500,
                message: "Something went wrong",
              },
            },
          },
        },
      },
    },
  },

  "/delete-category/{id}": {
    delete: {
      tags: ["Category Service"],
      summary: "Soft delete category by ID",
      description:
        "Soft deletes a category by updating the deleted_at field with the current date instead of permanently deleting the category.",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          example: "65f1a2b3c4d5e6f789012345",
          description: "MongoDB Category ObjectId",
        },
      ],
      responses: {
        200: {
          description: "Category deleted successfully",
          content: {
            "application/json": {
              example: {
                code: 200,
                message: "Category deleted successfully",
              },
            },
          },
        },
        404: {
          description: "Category not found",
          content: {
            "application/json": {
              example: {
                code: 404,
                message: "Category not found",
              },
            },
          },
        },
        500: {
          description: "Server error",
          content: {
            "application/json": {
              example: {
                code: 500,
                message: "Something went wrong",
              },
            },
          },
        },
      },
    },
  },
};

export default categorySwagger;