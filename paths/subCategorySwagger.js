const subCategorySwagger = {
    "/create-subCategory": {
        post: {
            tags: ["SubCategory Service"],
            summary: "Create subcategory",
            description:
                "Creates a new subcategory under an existing category. Requires category_id and subCategoryName. It checks whether the category exists and prevents duplicate subcategories for the same category.",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["category_id", "subCategoryName"],
                            properties: {
                                category_id: {
                                    type: "string",
                                    example: "65f1a2b3c4d5e6f789012345",
                                    description: "MongoDB Category ObjectId",
                                },
                                subCategoryName: {
                                    type: "string",
                                    example: "Mobiles",
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "Subcategory created successfully",
                    content: {
                        "application/json": {
                            example: {
                                code: 200,
                                message: "SubCategory is created successfully",
                            },
                        },
                    },
                },
                400: {
                    description:
                        "Validation error or duplicate subcategory for the selected category",
                    content: {
                        "application/json": {
                            examples: {
                                categoryIdRequired: {
                                    value: {
                                        code: 400,
                                        message: "Please enter the category Id",
                                    },
                                },
                                subCategoryNameRequired: {
                                    value: {
                                        code: 400,
                                        message: "Please enter the subcategory Name",
                                    },
                                },
                                duplicateSubCategory: {
                                    value: {
                                        code: 400,
                                        message: "subcategory already exists for the category",
                                    },
                                },
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
                                message: "Catergory not found",
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

    "/get-all-subCategory": {
        get: {
            tags: ["SubCategory Service"],
            summary: "Get all subcategories",
            description:
                "Fetches all active subcategories where deleted_at is null. Supports pagination and search by subCategoryName.",
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
                        default: 5,
                    },
                    example: 5,
                    description: "Number of subcategories per page",
                },
                {
                    in: "query",
                    name: "search",
                    required: false,
                    schema: {
                        type: "string",
                    },
                    example: "mobiles",
                    description: "Search subcategory by name",
                },
            ],
            responses: {
                200: {
                    description: "Subcategories fetched successfully",
                    content: {
                        "application/json": {
                            example: [
                                {
                                    _id: null,
                                    docs: [
                                        {
                                            _id: "65f1a2b3c4d5e6f789012346",
                                            category_id: "65f1a2b3c4d5e6f789012345",
                                            subCategoryName: "Mobiles",
                                            deleted_at: null,
                                        },
                                    ],
                                    headers: {
                                        total_count: 1,
                                        total_pages: 1,
                                        current_page: 1,
                                        limit: 5,
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

    "/update-subCategory/{id}": {
        put: {
            tags: ["SubCategory Service"],
            summary: "Update subcategory by ID",
            description:
                "Updates subcategory data using MongoDB ObjectId. You can update category_id and subCategoryName.",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    schema: {
                        type: "string",
                    },
                    example: "65f1a2b3c4d5e6f789012346",
                    description: "MongoDB SubCategory ObjectId",
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                category_id: {
                                    type: "string",
                                    example: "65f1a2b3c4d5e6f789012345",
                                },
                                subCategoryName: {
                                    type: "string",
                                    example: "Updated Mobiles",
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "Subcategory updated successfully",
                    content: {
                        "application/json": {
                            example: {
                                code: 200,
                                message: "SubCategory is updated successfully",
                            },
                        },
                    },
                },
                404: {
                    description: "Subcategory not found",
                    content: {
                        "application/json": {
                            example: {
                                code: 404,
                                message: "SubCategory not found",
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

    "/delete-subCategory/{id}": {
        delete: {
            tags: ["SubCategory Service"],
            summary: "Soft delete subcategory by ID",
            description:
                "Soft deletes a subcategory by updating deleted_at instead of permanently deleting the record.",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    schema: {
                        type: "string",
                    },
                    example: "65f1a2b3c4d5e6f789012346",
                    description: "MongoDB SubCategory ObjectId",
                },
            ],
            responses: {
                200: {
                    description: "Subcategory deleted successfully",
                    content: {
                        "application/json": {
                            example: {
                                code: 200,
                                message: "Subcategory is deleted successfully",
                            },
                        },
                    },
                },
                404: {
                    description: "Subcategory not found",
                    content: {
                        "application/json": {
                            example: {
                                code: 404,
                                message: "SubCategory not found",
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

export default subCategorySwagger;
