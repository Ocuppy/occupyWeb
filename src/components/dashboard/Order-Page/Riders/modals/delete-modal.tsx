import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { RiderType } from "@/lib/validations/riders.schema";
import { OrderType } from "@/lib/validations/schema";

type DeleteProps = {
  task: RiderType;
  isOpen: boolean;
  showActionToggle: (open: boolean) => void;
};

export default function DeleteDialog({ task, isOpen, showActionToggle }: DeleteProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={showActionToggle}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure absolutely sure ?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. You are about to delete Rider Details of{" "}
            <b>{task?.item}</b>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={() => {
              showActionToggle(false);
            }}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
