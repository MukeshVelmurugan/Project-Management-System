import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import API from "../api/axios";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

const columns = [
  "Pending",
  "In Progress",
  "Completed",
];

export default function Kanban() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data } = await API.get("/tasks");
    setTasks(data);
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;

    const updated = tasks.map((task) =>
      task.id.toString() === taskId
        ? { ...task, status: newStatus }
        : task
    );

    setTasks(updated);

    await API.put(`/tasks/${taskId}`, {
      status: newStatus,
    });
  };

  const getTasks = (status) =>
    tasks.filter((t) => t.status === status);

  return (
    <MainLayout>
      <div className="space-y-6">

        <div>
          <h1 className="text-3xl font-bold">
            Kanban Board
          </h1>
          <p className="text-gray-500">
            Drag tasks between columns
          </p>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid md:grid-cols-3 gap-5">

            {columns.map((column) => (
              <Droppable
                droppableId={column}
                key={column}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-gray-100 rounded-2xl p-4 min-h-[500px]"
                  >

                    <h2 className="font-bold mb-4 text-lg">
                      {column}
                    </h2>

                    {getTasks(column).map((task, index) => (
                      <Draggable
                        draggableId={task.id.toString()}
                        index={index}
                        key={task.id}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white rounded-xl shadow p-4 mb-3 cursor-grab"
                          >

                            <h3 className="font-semibold">
                              {task.name}
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                              {task.Project?.name}
                            </p>

                            <span className="inline-block mt-3 text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                              {task.priority}
                            </span>

                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}

                  </div>
                )}
              </Droppable>
            ))}

          </div>
        </DragDropContext>

      </div>
    </MainLayout>
  );
}