interface TodoRepositoryGetParams {
    page: number;
    limit: number;
}
interface TodoRepositoryGetOutput {
    todos: Todo[];
    total: number;
    pages: number;
}

function get({
    page,
    limit,
}: TodoRepositoryGetParams): Promise<TodoRepositoryGetOutput> {
    return fetch("/api/todos")
        .then(async (serverResponse) => {
            const todosString = await serverResponse.text();
            const todosFromServer = parseTodosFromServer(
                JSON.parse(todosString)
            ).todos;
            const ALL_TODOS = todosFromServer;
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const paginatedTodos = ALL_TODOS.slice(startIndex, endIndex);
            const totalPages = Math.ceil(ALL_TODOS.length / limit);

            return {
                todos: paginatedTodos,
                total: ALL_TODOS.length,
                pages: totalPages,
            };
        })
        .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error);
        });
}

export const todoRepository = {
    get,
};

interface Todo {
    id: string;
    description: string;
    date: Date;
    done: boolean;
}

// Security layer to verify returns of API
// Obs: Each company has the own business rules to implement here
function parseTodosFromServer(responseBody: unknown): { todos: Array<Todo> } {
    if (
        responseBody !== null &&
        typeof responseBody === "object" &&
        "todos" in responseBody &&
        Array.isArray(responseBody.todos)
    ) {
        return {
            todos: responseBody.todos.map((todo: unknown) => {
                if (todo === null && typeof todo !== "object")
                    throw new Error("Invalid todo from API");

                const { id, description, done, date } = todo as {
                    id: string;
                    description: string;
                    date: string;
                    done: string;
                };

                return {
                    id,
                    description,
                    done: String(done).toLowerCase() === "true",
                    date: new Date(date),
                };
            }),
        };
    }

    return {
        todos: [],
    };
}
