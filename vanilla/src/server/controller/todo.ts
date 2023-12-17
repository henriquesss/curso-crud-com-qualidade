import { NextApiRequest, NextApiResponse } from "next";
import { todoRepository } from "@server/repository/todo";
import { z as schema } from "zod";

async function get(req: NextApiRequest, res: NextApiResponse) {
    const query = req.query;
    const page = Number(query.page);
    const limit = Number(query.limit);

    if (query.page && isNaN(page)) {
        res.status(400).json({
            error: {
                message: "`page` must be a number",
            },
        });
        return;
    }
    if (query.limit && isNaN(limit)) {
        res.status(400).json({
            error: {
                message: "`limit` must be a number",
            },
        });
        return;
    }

    const output = todoRepository.get({ page, limit });

    res.status(200).json({
        total: output.total,
        pages: output.pages,
        todos: output.todos,
    });
}

const TodoCreateBodySchema = schema.object({
    content: schema.string(),
});

async function create(req: NextApiRequest, res: NextApiResponse) {
    // Fail Fast Validation
    const body = TodoCreateBodySchema.safeParse(req.body);
    if (!body.success) {
        // Type narrowing
        res.status(400).json({
            error: {
                message: "You need to provide a content to create a todo",
                description: body.error, // or body.error.issues directly
            },
        });
        return;
    }

    // Here er have the data
    const createdTodo = await todoRepository.createdByContent(
        body.data.content
    );

    res.status(201).json({
        todo: createdTodo,
    });
}

export const todoController = {
    get,
    create,
};
