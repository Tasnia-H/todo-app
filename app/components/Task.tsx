"use client";

import { ITask } from "@/types/tasks";
import { FormEventHandler, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";

interface TaskProps {
  task: ITask;
}

const Task = ({ task }: TaskProps) => {
  const router = useRouter();
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const [modalOpenDelete, setModalOpenDelete] = useState(false);
  const [taskEdit, setTaskEdit] = useState(task.text);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskEdit,
    });

    setModalOpenEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setModalOpenDelete(false);
    router.refresh();
  };

  return (
    <tr key={task.id}>
      <td className="w-full">{task.text}</td>
      <td className="flex gap-5">
        <input
          type="checkbox"
          className="checkbox checkbox-primary checkbox-xs"
          onClick={() => handleDeleteTask(task.id)}
        />

        <FaEdit
          className="text-primary size-4"
          cursor="pointer"
          onClick={() => setModalOpenEdit(true)}
        />

        {modalOpenEdit && (
          <Modal onClose={() => setModalOpenEdit(false)}>
            <form onSubmit={handleSubmitEditTodo}>
              <h3>Edit Task</h3>
              <div className="model-action">
                <input
                  value={taskEdit}
                  onChange={(e) => setTaskEdit(e.target.value)}
                  type="text"
                  placeholder="Type here"
                  className="input input-ghost w-full my-4"
                />
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </Modal>
        )}

        <FaRegTrashAlt
          className="text-error size-4"
          cursor="pointer"
          onClick={() => setModalOpenDelete(true)}
        />

        {modalOpenDelete && (
          <Modal onClose={() => setModalOpenDelete(false)}>
            <h3>Are you sure you want to delete this task?</h3>
            <div className="modal-action">
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="btn btn-error"
              >
                Yes
              </button>
            </div>
          </Modal>
        )}
      </td>
    </tr>
  );
};

export default Task;
