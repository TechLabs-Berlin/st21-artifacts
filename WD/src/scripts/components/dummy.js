this.state = {
  isMine: userInformation.UID == this.props.ownerKey,
};

handleDeletion = () => {
  database.ref(`items/${this.props.itemKey}`).remove();
};

{
  this.state.isMine && (
    <button onClick={this.handleDeletion} className="item-delete-button">
      X
    </button>
  );
}
