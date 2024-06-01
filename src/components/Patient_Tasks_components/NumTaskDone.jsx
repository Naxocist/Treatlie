function NumTaskDone({complete, all}) {
  return (
    <section className="text">
      <div>
        <p>Task Done</p>
      </div>
      <div className="done">
        {complete}/{all}
      </div>
    </section>
  );

}
export default NumTaskDone;