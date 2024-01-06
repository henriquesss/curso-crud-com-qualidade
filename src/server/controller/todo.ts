import { todoRepository } from "@server/repository/todo";
import { z as schema } from "zod";
import { HttpNotFoundError } from "@server/infra/errors";

async function get(req: Request) {
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams
  const { searchParams } = new URL(req.url);
  const query = {
    page: searchParams.get("page"),
    limit: searchParams.get("limit"),
  };
  const page = Number(query.page);
  const limit = Number(query.limit);

  if (query.page && isNaN(page)) {
    return new Response(
      JSON.stringify({
        error: {
          message: "`page` must be a number",
        },
      }),
      {
        status: 400,
      }
    );
  }
  if (query.limit && isNaN(limit)) {
    return new Response(
      JSON.stringify({
        error: {
          message: "`limit` must be a number",
        },
      }),
      {
        status: 400,
      }
    );
  }

  try {
    const output = await todoRepository.get({ page, limit });

    return new Response(
      JSON.stringify({
        total: output.total,
        pages: output.pages,
        todos: output.todos,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: {
          message: "Failed to fetch todos",
        },
      }),
      {
        status: 400,
      }
    );
  }
}

const TodoCreateBodySchema = schema.object({
  content: schema.string(),
});

async function create(req: Request) {
  // Fail Fast Validation
  const body = TodoCreateBodySchema.safeParse(await req.json());
  if (!body.success) {
    // Type narrowing
    return new Response(
      JSON.stringify({
        error: {
          message: "You need to provide a content to create a todo",
          description: body.error, // or body.error.issues directly
        },
      }),
      {
        status: 400,
      }
    );
  }

  // Here we have the data
  try {
    const createdTodo = await todoRepository.createdByContent(
      body.data.content
    );

    return new Response(
      JSON.stringify({
        todo: createdTodo,
      }),
      {
        status: 201,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: {
          message: "Failed to create Todo",
        },
      }),
      {
        status: 400,
      }
    );
  }
}

async function toggleDone(req: Request, id: string) {
  const todoId = id;

  // Fail Fast Validation
  if (!todoId || typeof todoId !== "string") {
    return new Response(
      JSON.stringify({
        error: {
          message: "You must to provide a string ID",
        },
      }),
      {
        status: 400,
      }
    );
  }

  try {
    const updatedTodo = await todoRepository.toggleDone(todoId);
    return new Response(
      JSON.stringify({
        todo: updatedTodo,
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    if (err instanceof Error) {
      return new Response(
        JSON.stringify({
          error: {
            message: err.message,
          },
        }),
        {
          status: 404,
        }
      );
    }
  }
}

async function deleteById(req: Request, id: string) {
  const query = {
    id,
  };
  const QuerySchema = schema.object({
    id: schema.string().uuid().min(1),
  });
  // Fail fast
  const parsedQuery = QuerySchema.safeParse(query);
  if (!parsedQuery.success) {
    return new Response(
      JSON.stringify({
        error: {
          message: `You must to provide a valid id`,
        },
      }),
      {
        status: 400,
      }
    );
  }

  try {
    const todoId = parsedQuery.data.id;
    await todoRepository.deleteById(todoId);

    return new Response(JSON.stringify(null), {
      status: 204,
    });
  } catch (error) {
    if (error instanceof HttpNotFoundError) {
      return new Response(
        JSON.stringify({
          error: {
            message: error.message,
          },
        }),
        {
          status: error.status,
        }
      );
    }

    return new Response(
      JSON.stringify({
        error: {
          message: `Internal server error`,
        },
      }),
      { status: 500 }
    );
  }
}

export const todoController = {
  get,
  create,
  toggleDone,
  deleteById,
};
