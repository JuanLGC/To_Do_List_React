import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { TaskItem } from "./tasks";

//create your first component
export function Home() {
	return <TaskItem index="1" task="Puto el que lo lea" />;
}
