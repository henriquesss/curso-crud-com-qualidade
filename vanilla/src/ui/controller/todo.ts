import { todoRepository } from "@ui/repository/todo";

interface TodoControllerGetParams {
    page: number;
}

async function get(params: TodoControllerGetParams) {
    return todoRepository.get({
        page: params.page,
        limit: 2,
    });
}

function filterTodosByContent<Todo>(
    search: string,
    todos: Array<Todo & { content: string }> // Isso é loucura papai
): Todo[] {
    const homeTodos = todos.filter((todo) => {
        const searchNormalized = search.toLowerCase();
        const contentNormalized = todo.content.toLowerCase();

        return contentNormalized.includes(searchNormalized);
    });

    return homeTodos;
}

interface TodoControllerCreateParams {
    content: string;
    onSuccess: (todo: any) => void;
    onError: () => void;
}
function create({ content, onSuccess, onError }: TodoControllerCreateParams) {
    // Fail Fast
    if (!content) {
        onError();
        return;
    }

    const todo = {
        id: "123456",
        content,
        date: new Date(),
        done: false,
    };

    onSuccess(todo);
}

export const todoController = {
    get,
    filterTodosByContent,
    create,
};
