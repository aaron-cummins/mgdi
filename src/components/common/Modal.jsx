import Modal from "@mui/joy/Modal";
import { ModalClose, ModalDialog, Typography } from "@mui/joy";

const ModalMui = (props) => {
  return (
    <Modal open={props.open} onClose={props.onClose} data-testid="modaltest">
      <ModalDialog
        id={props.modalId}
        aria-labelledby="layout-modal-title"
        aria-describedby="layout-modal-description"
        layout={"center"}
        n
        sx={{
          width: props.dimension === "xl" ? "80%" : "60%",
          maxWidth: "90%",
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
          overflowY: "scroll",
          //mx: "calc(-1 * var(--Sheet-background))",
          m: "calc(-1 * var(--ModalDialog-padding))",
          //px: "var(--Sheet-background)",
        }}>
        <ModalClose />
        <Typography component="h2" id="modal-title" level="h4" textColor="inherit" fontWeight="md" mb={1}>
          {props.ModalTitle}
        </Typography>
        <hr className="mb-2 mt-2" />
        {props.children}
      </ModalDialog>
    </Modal>
  );
};

export default ModalMui;
