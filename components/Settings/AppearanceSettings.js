"use client";
import { useDispatch, useSelector } from "react-redux";
import { updateStyle } from "@/reducers/stylesReducer"; // Импортируйте ваш action creator

const AppearanceSettings = () => {
  const style = useSelector((state) => state.styles); // Используйте Redux для получения стилей
  const dispatch = useDispatch();

  const generalBlockStyle =
    "w-12 h-12 rounded-lg border-2 border-zinc-950 cursor-pointer";

  const handleForegroundClick = (
    foreground,
    input,
    optionHover,
    btnHover,
    icon
  ) => {
    dispatch(
      updateStyle({ ...style, foreground, input, optionHover, btnHover, icon })
    ); // Отправьте новый стиль в Redux
  };

  const handleBackgroundClick = (background) => {
    dispatch(updateStyle({ ...style, background })); // Отправьте новый стиль в Redux
  };

  const handleTextClick = (text) => {
    dispatch(updateStyle({ ...style, text })); // Отправьте новый стиль в Redux
  };

  return (
    <div>
      <h2 className="text-center text-2xl font-semibold">Оформление</h2>
      <div className="mt-5 flex flex-col gap-2">
        <h3 className="text-left text-xl font-medium">Передний фон</h3>
        <div className="grid grid-cols-8 gap-4 justify-left">
          <div
            className={`bg-zinc-200 ${generalBlockStyle}`}
            data-foreground="bg-zinc-200"
            data-input="bg-zinc-100"
            data-option-hover="hover:bg-zinc-300"
            data-btn-hover="hover:bg-zinc-400"
            data-icon="text-zinc-300"
            onClick={(e) =>
              handleForegroundClick(
                e.currentTarget.getAttribute("data-foreground"),
                e.currentTarget.getAttribute("data-input"),
                e.currentTarget.getAttribute("data-option-hover"),
                e.currentTarget.getAttribute("data-btn-hover"),
                e.currentTarget.getAttribute("data-icon")
              )
            }
          ></div>

          <div
            className={`bg-lime-200 ${generalBlockStyle}`}
            data-foreground="bg-lime-200"
            data-input="bg-lime-100"
            data-option-hover="hover:bg-lime-300"
            data-btn-hover="hover:bg-lime-400"
            data-icon="text-lime-300"
            onClick={(e) =>
              handleForegroundClick(
                e.currentTarget.getAttribute("data-foreground"),
                e.currentTarget.getAttribute("data-input"),
                e.currentTarget.getAttribute("data-option-hover"),
                e.currentTarget.getAttribute("data-btn-hover"),
                e.currentTarget.getAttribute("data-icon")
              )
            }
          ></div>

          <div
            className={`bg-yellow-200 ${generalBlockStyle}`}
            data-foreground="bg-yellow-200"
            data-input="bg-yellow-100"
            data-option-hover="hover:bg-yellow-300"
            data-btn-hover="hover:bg-yellow-400"
            data-icon="text-yellow-300"
            onClick={(e) =>
              handleForegroundClick(
                e.currentTarget.getAttribute("data-foreground"),
                e.currentTarget.getAttribute("data-input"),
                e.currentTarget.getAttribute("data-option-hover"),
                e.currentTarget.getAttribute("data-btn-hover"),
                e.currentTarget.getAttribute("data-icon")
              )
            }
          ></div>

          <div
            className={`bg-fuchsia-200 ${generalBlockStyle}`}
            data-foreground="bg-fuchsia-200"
            data-input="bg-fuchsia-100"
            data-option-hover="hover:bg-fuchsia-300"
            data-btn-hover="hover:bg-fuchsia-400"
            data-icon="text-fuchsia-300"
            onClick={(e) =>
              handleForegroundClick(
                e.currentTarget.getAttribute("data-foreground"),
                e.currentTarget.getAttribute("data-input"),
                e.currentTarget.getAttribute("data-option-hover"),
                e.currentTarget.getAttribute("data-btn-hover"),
                e.currentTarget.getAttribute("data-icon")
              )
            }
          ></div>

          {/* Кнопка 5 */}
          <div
            className={`bg-green-200 ${generalBlockStyle}`}
            data-foreground="bg-green-200"
            data-input="bg-green-100"
            data-option-hover="hover:bg-green-300"
            data-btn-hover="hover:bg-green-400"
            data-icon="text-green-300"
            onClick={(e) =>
              handleForegroundClick(
                e.currentTarget.getAttribute("data-foreground"),
                e.currentTarget.getAttribute("data-input"),
                e.currentTarget.getAttribute("data-option-hover"),
                e.currentTarget.getAttribute("data-btn-hover"),
                e.currentTarget.getAttribute("data-icon")
              )
            }
          ></div>

          {/* Кнопка 6 */}
          <div
            className={`bg-cyan-200 ${generalBlockStyle}`}
            data-foreground="bg-cyan-200"
            data-input="bg-cyan-100"
            data-option-hover="hover:bg-cyan-300"
            data-btn-hover="hover:bg-cyan-400"
            data-icon="text-cyan-300"
            onClick={(e) =>
              handleForegroundClick(
                e.currentTarget.getAttribute("data-foreground"),
                e.currentTarget.getAttribute("data-input"),
                e.currentTarget.getAttribute("data-option-hover"),
                e.currentTarget.getAttribute("data-btn-hover"),
                e.currentTarget.getAttribute("data-icon")
              )
            }
          ></div>

          {/* Кнопка 7 */}
          <div
            className={`bg-blue-200 ${generalBlockStyle}`}
            data-foreground="bg-blue-200"
            data-input="bg-blue-100"
            data-option-hover="hover:bg-blue-300"
            data-btn-hover="hover:bg-blue-400"
            data-icon="text-blue-300"
            onClick={(e) =>
              handleForegroundClick(
                e.currentTarget.getAttribute("data-foreground"),
                e.currentTarget.getAttribute("data-input"),
                e.currentTarget.getAttribute("data-option-hover"),
                e.currentTarget.getAttribute("data-btn-hover"),
                e.currentTarget.getAttribute("data-icon")
              )
            }
          ></div>

          {/* Кнопка 8 */}
          <div
            className={`bg-slate-200 ${generalBlockStyle}`}
            data-foreground="bg-slate-200"
            data-input="bg-slate-100"
            data-option-hover="hover:bg-slate-300"
            data-btn-hover="hover:bg-slate-400"
            data-icon="text-slate-300"
            onClick={(e) =>
              handleForegroundClick(
                e.currentTarget.getAttribute("data-foreground"),
                e.currentTarget.getAttribute("data-input"),
                e.currentTarget.getAttribute("data-option-hover"),
                e.currentTarget.getAttribute("data-btn-hover"),
                e.currentTarget.getAttribute("data-icon")
              )
            }
          ></div>

          {/* Кнопка 9 */}
          <div
            className={`bg-orange-200 ${generalBlockStyle}`}
            data-foreground="bg-orange-200"
            data-input="bg-orange-100"
            data-option-hover="hover:bg-orange-300"
            data-btn-hover="hover:bg-orange-400"
            data-icon="text-orange-300"
            onClick={(e) =>
              handleForegroundClick(
                e.currentTarget.getAttribute("data-foreground"),
                e.currentTarget.getAttribute("data-input"),
                e.currentTarget.getAttribute("data-option-hover"),
                e.currentTarget.getAttribute("data-btn-hover"),
                e.currentTarget.getAttribute("data-icon")
              )
            }
          ></div>

          {/* Кнопка 10 */}
          <div
            className={`bg-zinc-700 ${generalBlockStyle}`}
            data-foreground="bg-zinc-700"
            data-input="bg-zinc-600"
            data-option-hover="hover:bg-zinc-800"
            data-btn-hover="hover:bg-zinc-900"
            data-icon="text-zinc-800"
            onClick={(e) =>
              handleForegroundClick(
                e.currentTarget.getAttribute("data-foreground"),
                e.currentTarget.getAttribute("data-input"),
                e.currentTarget.getAttribute("data-option-hover"),
                e.currentTarget.getAttribute("data-btn-hover"),
                e.currentTarget.getAttribute("data-icon")
              )
            }
          ></div>

          {/* Кнопка 11 */}
          <div
            className={`bg-emerald-700 ${generalBlockStyle}`}
            data-foreground="bg-emerald-700"
            data-input="bg-emerald-600"
            data-option-hover="hover:bg-emerald-800"
            data-btn-hover="hover:bg-emerald-900"
            data-icon="text-emerald-800"
            onClick={(e) =>
              handleForegroundClick(
                e.currentTarget.getAttribute("data-foreground"),
                e.currentTarget.getAttribute("data-input"),
                e.currentTarget.getAttribute("data-option-hover"),
                e.currentTarget.getAttribute("data-btn-hover"),
                e.currentTarget.getAttribute("data-icon")
              )
            }
          ></div>

          {/* Кнопка 12 */}
          <div
            className={`bg-slate-700 ${generalBlockStyle}`}
            data-foreground="bg-slate-700"
            data-input="bg-slate-600"
            data-option-hover="hover:bg-slate-800"
            data-btn-hover="hover:bg-slate-900"
            data-icon="text-slate-800"
            onClick={(e) =>
              handleForegroundClick(
                e.currentTarget.getAttribute("data-foreground"),
                e.currentTarget.getAttribute("data-input"),
                e.currentTarget.getAttribute("data-option-hover"),
                e.currentTarget.getAttribute("data-btn-hover"),
                e.currentTarget.getAttribute("data-icon")
              )
            }
          ></div>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-2">
        <h3 className="text-left text-xl font-medium">Задний фон</h3>
        <div className="grid grid-cols-8 gap-4 justify-left">
          <div
            className={`bg-zinc-300 ${generalBlockStyle}`}
            data-background="bg-zinc-300"
            onClick={(e) =>
              handleBackgroundClick(
                e.currentTarget.getAttribute("data-background")
              )
            }
          ></div>
          <div
            className={`bg-lime-300 ${generalBlockStyle}`}
            data-background="bg-lime-300"
            onClick={(e) =>
              handleBackgroundClick(
                e.currentTarget.getAttribute("data-background")
              )
            }
          ></div>
          <div
            className={`bg-yellow-300 ${generalBlockStyle}`}
            data-background="bg-yellow-300"
            onClick={(e) =>
              handleBackgroundClick(
                e.currentTarget.getAttribute("data-background")
              )
            }
          ></div>
          <div
            className={`bg-fuchsia-300 ${generalBlockStyle}`}
            data-background="bg-fuchsia-300"
            onClick={(e) =>
              handleBackgroundClick(
                e.currentTarget.getAttribute("data-background")
              )
            }
          ></div>
          <div
            className={`bg-green-300 ${generalBlockStyle}`}
            data-background="bg-green-300"
            onClick={(e) =>
              handleBackgroundClick(
                e.currentTarget.getAttribute("data-background")
              )
            }
          ></div>
          <div
            className={`bg-cyan-300 ${generalBlockStyle}`}
            data-background="bg-cyan-300"
            onClick={(e) =>
              handleBackgroundClick(
                e.currentTarget.getAttribute("data-background")
              )
            }
          ></div>
          <div
            className={`bg-blue-300 ${generalBlockStyle}`}
            data-background="bg-blue-300"
            onClick={(e) =>
              handleBackgroundClick(
                e.currentTarget.getAttribute("data-background")
              )
            }
          ></div>
          <div
            className={`bg-slate-300 ${generalBlockStyle}`}
            data-background="bg-slate-300"
            onClick={(e) =>
              handleBackgroundClick(
                e.currentTarget.getAttribute("data-background")
              )
            }
          ></div>
          <div
            className={`bg-orange-300 ${generalBlockStyle}`}
            data-background="bg-orange-300"
            onClick={(e) =>
              handleBackgroundClick(
                e.currentTarget.getAttribute("data-background")
              )
            }
          ></div>
          <div
            className={`bg-zinc-800 ${generalBlockStyle}`}
            data-background="bg-zinc-800"
            onClick={(e) =>
              handleBackgroundClick(
                e.currentTarget.getAttribute("data-background")
              )
            }
          ></div>
          <div
            className={`bg-emerald-800 ${generalBlockStyle}`}
            data-background="bg-emerald-800"
            onClick={(e) =>
              handleBackgroundClick(
                e.currentTarget.getAttribute("data-background")
              )
            }
          ></div>
          <div
            className={`bg-slate-800 ${generalBlockStyle}`}
            data-background="bg-slate-800"
            onClick={(e) =>
              handleBackgroundClick(
                e.currentTarget.getAttribute("data-background")
              )
            }
          ></div>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-2">
        <h3 className="text-left text-xl font-medium">Текст</h3>
        <div className="grid grid-cols-8 gap-4 justify-left">
          <div
            className={`bg-black ${generalBlockStyle}`}
            data-text="text-black"
            onClick={(e) =>
              handleTextClick(e.currentTarget.getAttribute("data-text"))
            }
          ></div>
          <div
            className={`bg-zinc-600 ${generalBlockStyle}`}
            data-text="text-zinc-600"
            onClick={(e) =>
              handleTextClick(e.currentTarget.getAttribute("data-text"))
            }
          ></div>
          <div
            className={`bg-amber-800 ${generalBlockStyle}`}
            data-text="text-amber-800"
            onClick={(e) =>
              handleTextClick(e.currentTarget.getAttribute("data-text"))
            }
          ></div>
          <div
            className={`bg-white ${generalBlockStyle}`}
            data-text="text-white"
            onClick={(e) =>
              handleTextClick(e.currentTarget.getAttribute("data-text"))
            }
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;
