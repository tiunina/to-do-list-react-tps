import React, { useEffect, useState } from "react";
import s from "./TaskList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { reorderTasks, selectTasks } from "../../redux/taskSlice";
import TaskItem from "../Task/TaskItem";
import { fetchData } from "../../redux/operations";
import { AppDispatch } from "../../redux/store";
import { selectFilter, selectFilteredTasks } from "../../redux/selector";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import SortableItem from "../SortableItem/SortableItem";

const TaskList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector(selectFilteredTasks);
  const filter = useSelector(selectFilter);

  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    setItems(tasks.map((t) => t.id));
  }, [tasks]);

  const filterData =
    filter === "all"
      ? tasks
      : tasks.filter((task) =>
          task.task.toLowerCase().includes(filter.toLowerCase())
        );

  const filteredIds = filterData.map((task) => task.id);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);

      setItems(newItems);
      dispatch(reorderTasks(newItems));
    }
  };

  return (
    // <ul className={s.list}>
    //   {filterData?.map((item) => {
    //     if (!item || !item.id) return null;
    //     return <TaskItem key={item.id} {...item} />;
    //   })}
    // </ul>
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={filteredIds}
        strategy={verticalListSortingStrategy}
      >
        <ul className={s.list}>
          {filteredIds.map((id) => {
            const task = tasks.find((t) => t.id === id);
            return task ? <SortableItem key={task.id} {...task} /> : null;
          })}
        </ul>
      </SortableContext>
    </DndContext>
  );
};

export default TaskList;
