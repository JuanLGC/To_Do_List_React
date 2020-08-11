import React, { useState, useEffect } from "react";

export function ToDoList() {
	const [task, setTask] = useState([]);
	const toDoListUrl =
		"https://assets.breatheco.de/apis/fake/todos/user/JuanLGC";

	function addTask(e) {
		let input = document.querySelector("input").value;
		if (e.key === "Enter") {
			setTask(task => [...task, { label: input, done: false }]);
			fetch(toDoListUrl, {
				method: "PUT",
				body: JSON.stringify(task),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(resp => {
					return resp.json();
				})
				.then(data => {
					console.log(data);
				})
				.catch(error => {
					console.log(error);
				});

			console.log(task);
		}
	}

	function deleteTask(elementIndex) {
		var filtered = task.filter(function(value, i) {
			return elementIndex !== i;
		});
		setTask(filtered);
		fetch(toDoListUrl, {
			method: "PUT",
			body: JSON.stringify(filtered),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp.json();
			})
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});

		console.log(filtered);
	}
	useEffect(() => {
		fetch(toDoListUrl)
			.then(response => response.json())
			.then(responseJSON => {
				setTask(responseJSON);
				console.log(responseJSON);
			});
	}, []);

	useEffect(
		() => {
			fetch(toDoListUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(task)
			})
				.then(response => response.json())
				.then(data => {
					console.log("Success:", data);
				})
				.catch(error => {
					console.error("Error:", error);
				});
		},
		[task]
	);
	return (
		<div>
			<h1 className="text-center">MY TO DO LIST</h1>
			<div className="container justify-content-center">
				<div className="col-10 offset-1 list-body">
					<div className="offset-1 pt-2">
						<label className="mr-1">
							<strong>Add Task:</strong>
						</label>
						<input
							type="text"
							onKeyPress={e => {
								addTask(e);
							}}
						/>
					</div>
					<ul className="col-10 offset-1 py-3">
						{task.map((text, index) => {
							return (
								<li
									key={index}
									className=" pt-2 justify-content-between">
									<p className="mt-1 pl-2"> {text.label}</p>
									<span
										className="mt-2 pr-4"
										onClick={() => {
											deleteTask(index);
										}}>
										<strong>X</strong>
									</span>
								</li>
							);
						})}
					</ul>
					<div className="text-muted pb-1">
						<p>{task.length} tasks to do</p>
					</div>
				</div>
			</div>
		</div>
	);
}
