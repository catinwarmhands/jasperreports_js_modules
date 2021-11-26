import sys
import os
import pyperclip  # type: ignore[import]

def running_via_pyinstall() -> bool:
    return getattr(sys, 'frozen', False) and hasattr(sys, '_MEIPASS')


def real_path(p: str) -> str:
    root = sys.argv[0] if running_via_pyinstall() else __file__
    return os.path.abspath(os.path.join(os.path.dirname(root), p)).replace("\\","/")


def main():
    if len(sys.argv) < 2:
        filename = "script.js"
    else:
        filename = sys.argv[1]

    try:
        with open(real_path(filename), "r", encoding="utf-8") as f:
            source = f.read()

        r = repr(source)
        r = '"' + r[1:len(r)-1].replace('"', '\\"') + '"'

        pyperclip.copy(r)
        print(r)
        print()
        print(f"/*Copied {len(r)} characters to clipboard*/")

    except Exception as e:
        print(f"Error reading file {filename}: {str(e)}")


    if running_via_pyinstall():
        print()
        input("/*Press Enter to continue...*/")

if __name__ == "__main__":
    main()