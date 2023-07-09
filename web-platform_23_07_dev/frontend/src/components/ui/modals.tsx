export const ModalConfirm1 = ({
  isModalVisible = false,
  // @ts-ignore
  setIsModalVisible,
  description = "You are a seriously?",
  // @ts-ignore
  callback,
}) => {
  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div
      className={
        isModalVisible
          ? "custom_modal_1 custom_modal_1_active custom-z-index-1"
          : "custom_modal_1 custom-z-index-1"
      }
      onClick={() => setIsModalVisible(false)}
    >
      <div
        className={"custom_modal_content_1"}
        onClick={(event) => event.stopPropagation()}
      >
        {description && <h2>{description}</h2>}
        <button
          type="button"
          onClick={() => {
            setIsModalVisible(false);
            callback();
          }}
          className="btn btn-lg btn-outline-success m-1 p-2"
        >
          okay
        </button>
        <button
          type="button"
          onClick={() => setIsModalVisible(false)}
          className="btn btn-lg btn-outline-secondary m-1 p-2"
        >
          cancel
        </button>
      </div>
    </div>
  );
};
