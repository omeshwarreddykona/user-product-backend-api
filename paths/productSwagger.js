const productSwagger = {
    "/create-product": {
        post: {
            tags: ["Product Service"],
            summary: "Create product or toggle product availability",
            description:
                "Creates a new product if _id is not provided. If _id is provided, it toggles the product availability status. This API requires JWT authentication because created_by is taken from the logged-in user's email.",
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
                            properties: {
                                _id: {
                                    type: "string",
                                    example: "65f1a2b3c4d5e6f789012345",
                                    description:
                                        "Optional. If provided, product availability will be toggled instead of creating a new product.",
                                },
                                name: {
                                    type: "string",
                                    example: "Laptop",
                                },
                                category: {
                                    type: "string",
                                    example: "Electronics",
                                },
                                price: {
                                    type: "number",
                                    example: 55000,
                                },
                                isAvailable: {
                                    type: "boolean",
                                    example: true,
                                },
                            },
                        },
                        examples: {
                            createProduct: {
                                summary: "Create new product",
                                value: {
                                    name: "Laptop",
                                    category: "Electronics",
                                    price: 55000,
                                    isAvailable: true,
                                },
                            },
                            toggleAvailability: {
                                summary: "Toggle product availability",
                                value: {
                                    _id: "65f1a2b3c4d5e6f789012345",
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "Product created successfully",
                    content: {
                        "application/json": {
                            example: {
                                code: 201,
                                message: "Product created but the product is temporary unavailable",
                            },
                        },
                    },
                },
                200: {
                    description: "Product availability updated successfully",
                    content: {
                        "application/json": {
                            examples: {
                                available: {
                                    value: {
                                        code: 200,
                                        message: "product is available",
                                    },
                                },
                                unavailable: {
                                    value: {
                                        code: 200,
                                        message: "Product is temporary unavailable",
                                    },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: "Validation error or duplicate product",
                    content: {
                        "application/json": {
                            examples: {
                                nameRequired: {
                                    value: {
                                        code: 400,
                                        message: "Name is required",
                                    },
                                },
                                categoryRequired: {
                                    value: {
                                        code: 400,
                                        message: "category is required",
                                    },
                                },
                                priceRequired: {
                                    value: {
                                        code: 400,
                                        message: "Price is required",
                                    },
                                },
                                duplicateProduct: {
                                    value: {
                                        code: 400,
                                        message: "The Product already exists",
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

    "/get-all-product": {
        get: {
            tags: ["Product Service"],
            summary: "Get all products",
            description:
                "Fetches all active products where deleted_at is null. Supports pagination and search by product name or category.",
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
                    description: "Number of products per page",
                },
                {
                    in: "query",
                    name: "search",
                    required: false,
                    schema: {
                        type: "string",
                    },
                    example: "laptop",
                    description: "Search product by name or category",
                },
            ],
            responses: {
                200: {
                    description: "Products fetched successfully",
                    content: {
                        "application/json": {
                            example: [
                                {
                                    _id: null,
                                    docs: [
                                        {
                                            _id: "65f1a2b3c4d5e6f789012345",
                                            name: "Laptop",
                                            category: "Electronics",
                                            price: 55000,
                                            isAvailable: true,
                                            created_by: "[omeshwar@example.com](mailto:omeshwar@example.com)",
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

    "/get-product-id/{id}": {
        get: {
            tags: ["Product Service"],
            summary: "Get product by ID",
            description: "Fetches a single product by MongoDB ObjectId.",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    schema: {
                        type: "string",
                    },
                    example: "65f1a2b3c4d5e6f789012345",
                    description: "MongoDB Product ObjectId",
                },
            ],
            responses: {
                200: {
                    description: "Product fetched successfully",
                    content: {
                        "application/json": {
                            example: {
                                code: 200,
                                message: "we get the data by ID",
                                data: {
                                    _id: "65f1a2b3c4d5e6f789012345",
                                    name: "Laptop",
                                    category: "Electronics",
                                    price: 55000,
                                    isAvailable: true,
                                    created_by: "[omeshwar@example.com](mailto:omeshwar@example.com)",
                                    deleted_at: null,
                                },
                            },
                        },
                    },
                },
                404: {
                    description: "Product not found",
                    content: {
                        "application/json": {
                            example: {
                                code: 404,
                                message: "Product not found",
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

    "/update-product-id/{id}": {
        put: {
            tags: ["Product Service"],
            summary: "Update product by ID",
            description:
                "Updates product details using MongoDB ObjectId. You can update name, category, price, and isAvailable fields.",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    schema: {
                        type: "string",
                    },
                    example: "65f1a2b3c4d5e6f789012345",
                    description: "MongoDB Product ObjectId",
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
                                    example: "Updated Laptop",
                                },
                                category: {
                                    type: "string",
                                    example: "Electronics",
                                },
                                price: {
                                    type: "number",
                                    example: 60000,
                                },
                                isAvailable: {
                                    type: "boolean",
                                    example: true,
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "Product updated successfully",
                    content: {
                        "application/json": {
                            example: {
                                code: 200,
                                message: "Product updated successfully",
                            },
                        },
                    },
                },
                404: {
                    description: "Product not found",
                    content: {
                        "application/json": {
                            example: {
                                code: 404,
                                message: "Product not found",
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

    "/soft-delete-product/{id}": {
        delete: {
            tags: ["Product Service"],
            summary: "Soft delete product by ID",
            description:
                "Soft deletes a product by updating deleted_at with the current date instead of permanently deleting the product.",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    schema: {
                        type: "string",
                    },
                    example: "65f1a2b3c4d5e6f789012345",
                    description: "MongoDB Product ObjectId",
                },
            ],
            responses: {
                200: {
                    description: "Product soft deleted successfully",
                    content: {
                        "application/json": {
                            example: {
                                code: 200,
                                message: "successfully updated",
                                data: {
                                    acknowledged: true,
                                    modifiedCount: 1,
                                    upsertedId: null,
                                    upsertedCount: 0,
                                    matchedCount: 1,
                                },
                            },
                        },
                    },
                },
                404: {
                    description: "Product not found",
                    content: {
                        "application/json": {
                            example: {
                                code: 404,
                                message: "Product not found",
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

export default productSwagger;
