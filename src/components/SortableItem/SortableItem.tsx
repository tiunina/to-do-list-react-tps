import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskItem from "../Task/TaskItem";
import { Task } from "../../types";

interface Props extends Task {}

const SortableItem: React.FC<Props> = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskItem {...props} />
    </li>
  );
};

export default SortableItem;
