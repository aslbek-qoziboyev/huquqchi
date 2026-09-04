package uz.meninghuquqim.app

import android.graphics.Color
import android.os.Bundle
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.LinearLayout
import android.widget.ScrollView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import kotlin.math.roundToInt

class MainActivity : AppCompatActivity() {
    private val navy = Color.rgb(15, 23, 42)
    private val primary = Color.rgb(37, 99, 235)
    private val background = Color.rgb(248, 250, 252)
    private val card = Color.WHITE
    private val text = Color.rgb(15, 23, 42)
    private val muted = Color.rgb(100, 116, 139)
    private lateinit var content: LinearLayout

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        window.statusBarColor = background
        window.navigationBarColor = background
        showDashboard()
    }

    private fun dp(value: Int) = (value * resources.displayMetrics.density).roundToInt()

    private fun base(): LinearLayout {
        val root = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setBackgroundColor(background)
        }
        root.addView(header(), LinearLayout.LayoutParams(-1, dp(64)))

        val scroll = ScrollView(this).apply { isFillViewport = true }
        content = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(dp(16), dp(16), dp(16), dp(88))
        }
        scroll.addView(content)
        root.addView(scroll, LinearLayout.LayoutParams(-1, 0, 1f))
        root.addView(bottomNav(), LinearLayout.LayoutParams(-1, dp(64)))
        return root
    }

    private fun header(): View {
        val row = LinearLayout(this).apply {
            gravity = Gravity.CENTER_VERTICAL
            setPadding(dp(18), 0, dp(18), 0)
            setBackgroundColor(card)
        }
        val title = TextView(this).apply {
            text = "Mening Huquqim"
            textSize = 20f
            setTextColor(navy)
            setTypeface(typeface, android.graphics.Typeface.BOLD)
        }
        row.addView(title, LinearLayout.LayoutParams(0, -1, 1f))
        val theme = TextView(this).apply {
            text = "☾"
            textSize = 25f
            gravity = Gravity.CENTER
            setTextColor(muted)
            setPadding(dp(10), 0, dp(4), 0)
        }
        row.addView(theme, LinearLayout.LayoutParams(dp(44), -1))
        return row
    }

    private fun bottomNav(): View {
        val nav = LinearLayout(this).apply {
            gravity = Gravity.CENTER
            setBackgroundColor(card)
            elevation = dp(8).toFloat()
        }
        listOf("⌂\nBosh sahifa", "⚖\nQonunlar", "＋\nSavol", "▣\nHujjatlar", "●\nProfil").forEachIndexed { i, label ->
            val b = TextView(this).apply {
                text = label
                gravity = Gravity.CENTER
                textSize = 11f
                setTextColor(if (i == 0) primary else muted)
                setPadding(0, dp(5), 0, 0)
                setOnClickListener {
                    when (i) {
                        0 -> showDashboard()
                        1 -> showLaws()
                        2 -> showAssistant()
                        3 -> showDocuments()
                        4 -> showProfile()
                    }
                }
            }
            nav.addView(b, LinearLayout.LayoutParams(0, -1, 1f))
        }
        return nav
    }

    private fun showDashboard() {
        setContentView(base())
        content.removeAllViews()
        content.addView(hero())
        val stats = LinearLayout(this).apply { orientation = LinearLayout.HORIZONTAL }
        stats.addView(stat("0", "Huquqiy\nsuhbatlar", primary), weightParams())
        stats.addView(stat("0", "Saqlangan\nqonunlar", Color.rgb(16, 185, 129)), weightParams())
        stats.addView(stat("0", "Yaratilgan\nhujjatlar", Color.rgb(147, 51, 234)), weightParams())
        content.addView(stats, LinearLayout.LayoutParams(-1, dp(110)).apply { bottomMargin = dp(14) })
        content.addView(section("So‘nggi huquqiy murojaatlar", "Hali hech qanday savol berilmadi.", "Yangi vaziyat bo‘yicha savol berish") { showAssistant() })
        content.addView(section("Shakllantirilgan hujjatlar", "Hozircha saqlangan hujjatlar mavjud emas.", "Shablonlar katalogiga o‘tish") { showDocuments() })
        content.addView(section("Saqlangan qonunlar va kodekslar", "Hali birorta qonun xatcho‘pga qo‘shilmagan.", "Qonunlar qidiruvi") { showLaws() })
    }

    private fun hero(): View {
        val box = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(dp(20), dp(20), dp(20), dp(20))
            setBackgroundColor(navy)
        }
        val badge = label("SHAXSIY HUQUQIY KABINET", Color.rgb(191, 219, 254))
        box.addView(badge)
        box.addView(title("Xush kelibsiz, Fuqaro!", Color.WHITE, 25f))
        box.addView(label("Bu yerda huquqiy murojaatlaringiz, qonunlar va rasmiy hujjatlaringizni boshqaring.", Color.rgb(203, 213, 225)))
        val btn = Button(this).apply {
            text = "＋  Yangi huquqiy savol"
            setTextColor(navy)
            setBackgroundColor(Color.WHITE)
            setOnClickListener { showAssistant() }
        }
        box.addView(btn, LinearLayout.LayoutParams(-1, dp(48)).apply { topMargin = dp(14) })
        return box
    }

    private fun stat(number: String, caption: String, accent: Int): View {
        val box = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            gravity = Gravity.CENTER
            setBackgroundColor(card)
            setPadding(dp(5), dp(8), dp(5), dp(8))
        }
        val n = title(number, accent, 22f).apply { gravity = Gravity.CENTER }
        val c = label(caption, muted).apply { gravity = Gravity.CENTER }
        box.addView(n)
        box.addView(c)
        return box
    }

    private fun section(head: String, empty: String, action: String, click: () -> Unit): View {
        val box = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(dp(16), dp(16), dp(16), dp(14))
            setBackgroundColor(card)
        }
        box.addView(title(head, text, 16f))
        box.addView(label(empty, muted).apply { gravity = Gravity.CENTER; setPadding(0, dp(22), 0, dp(14)) })
        val b = Button(this).apply {
            this.text = action
            setTextColor(primary)
            setBackgroundColor(Color.TRANSPARENT)
            setOnClickListener { click() }
        }
        box.addView(b, LinearLayout.LayoutParams(-1, dp(44)))
        return box.apply { layoutParams = LinearLayout.LayoutParams(-1, ViewGroup.LayoutParams.WRAP_CONTENT).apply { bottomMargin = dp(14) } }
    }

    private fun showAssistant() {
        setContentView(base())
        content.removeAllViews()
        content.addView(title("Huquqiy yordamchi", text, 26f))
        content.addView(label("Vaziyatingizni yozing. Sizga huquqiy yo‘nalish va keyingi qadamlarni tushuntirishga yordam beramiz.", muted))
        val input = android.widget.EditText(this).apply {
            hint = "Masalan: Ish beruvchi maoshimni bermayapti..."
            minLines = 5
            gravity = Gravity.TOP
            setPadding(dp(14), dp(14), dp(14), dp(14))
        }
        content.addView(input, LinearLayout.LayoutParams(-1, dp(150)).apply { topMargin = dp(18); bottomMargin = dp(10) })
        val send = Button(this).apply {
            text = "Savolni yuborish"
            setTextColor(Color.WHITE)
            setBackgroundColor(primary)
            setOnClickListener {
                input.setText("")
                android.widget.Toast.makeText(this@MainActivity, "Savol qabul qilindi", android.widget.Toast.LENGTH_SHORT).show()
            }
        }
        content.addView(send, LinearLayout.LayoutParams(-1, dp(48)))
        content.addView(label("Eslatma: javoblar umumiy ma’lumot sifatida beriladi; muhim ishlar bo‘yicha mutaxassis bilan maslahatlashish tavsiya etiladi.", muted).apply { setPadding(0, dp(18), 0, 0) })
    }

    private fun showLaws() {
        setContentView(base())
        content.removeAllViews()
        content.addView(title("Qonunlar va kodekslar", text, 26f))
        content.addView(label("Kerakli qonun yoki kodeksni qidiring.", muted))
        val search = android.widget.EditText(this).apply { hint = "Qidirish..." }
        content.addView(search, LinearLayout.LayoutParams(-1, dp(52)).apply { topMargin = dp(16) })
        listOf("O‘zbekiston Respublikasi Konstitutsiyasi", "Mehnat kodeksi", "Fuqarolik kodeksi", "Ma’muriy javobgarlik to‘g‘risidagi kodeks", "Jinoyat kodeksi").forEach { law ->
            val item = section(law, "Qonun hujjatini ko‘rish", "O‘qish") {
                android.widget.Toast.makeText(this, "$law ochildi", android.widget.Toast.LENGTH_SHORT).show()
            }
            content.addView(item)
        }
    }

    private fun showDocuments() {
        setContentView(base())
        content.removeAllViews()
        content.addView(title("Hujjatlar", text, 26f))
        content.addView(label("Rasmiy murojaat va ariza shablonlarini yarating.", muted))
        listOf("Ariza", "Shikoyat", "Talabnoma", "Ish beruvchiga murojaat").forEach { name ->
            content.addView(section(name, "Tayyor shablon asosida hujjat yaratish", "Yaratish") {
                android.widget.Toast.makeText(this, "$name yaratish boshlandi", android.widget.Toast.LENGTH_SHORT).show()
            })
        }
    }

    private fun showProfile() {
        setContentView(base())
        content.removeAllViews()
        content.addView(title("Profil", text, 26f))
        content.addView(section("Foydalanuvchi", "Fuqaro\nHisob sozlamalarini boshqarish", "Sozlamalar") { })
        content.addView(section("Ilova haqida", "Mening Huquqim — huquqiy ma’lumot va yordam platformasi.", "Tushunarli") { })
    }

    private fun title(value: String, color: Int, size: Float) = TextView(this).apply {
        text = value
        textSize = size
        setTextColor(color)
        setTypeface(typeface, android.graphics.Typeface.BOLD)
        setPadding(0, dp(5), 0, dp(8))
    }

    private fun label(value: String, color: Int) = TextView(this).apply {
        text = value
        textSize = 12f
        setTextColor(color)
        setPadding(0, dp(4), 0, dp(4))
    }

    private fun weightParams() = LinearLayout.LayoutParams(0, -1, 1f).apply { marginEnd = dp(5) }
}
