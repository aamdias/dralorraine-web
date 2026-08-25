"""Generate the didactic treatment loops used by the website.

Render with ManimGL (3b1b/manim):
manimgl scripts/manim/treatment_visuals.py -a -w -r 640x480 \
  -c '#F7F1E8' --video_dir public/treatment-visuals \
  --config_file scripts/manim/custom_config.yml
"""

from manimlib import *


INK = "#211E1B"
COPPER = "#9A6B50"
COPPER_LIGHT = "#C9A98E"
ROSE = "#E7D3C4"
SAND = "#F0E8DD"
PAPER = "#F7F1E8"
LINE = "#D9D0C5"


class TreatmentScene(Scene):
    def finish_loop(self, group):
        self.wait(0.7)
        self.play(FadeOut(group), run_time=0.65)
        self.wait(0.15)

    def progress_line(self):
        line = Line(LEFT * 4.4, RIGHT * 4.4, color=LINE, stroke_width=2).to_edge(DOWN, buff=0.55)
        dot = Dot(line.get_start(), radius=0.07, color=COPPER)
        self.add(line, dot)
        return line, dot


class TreatmentBotox(TreatmentScene):
    def construct(self):
        face = VGroup(
            Arc(radius=2.1, start_angle=25 * DEGREES, angle=130 * DEGREES, color=INK, stroke_width=3),
            Arc(radius=1.55, start_angle=20 * DEGREES, angle=55 * DEGREES, color=INK, stroke_width=2).shift(LEFT * 0.9 + UP * 0.15),
            Arc(radius=1.55, start_angle=105 * DEGREES, angle=55 * DEGREES, color=INK, stroke_width=2).shift(RIGHT * 0.9 + UP * 0.15),
            Line(UP * 0.2, DOWN * 1.0, color=COPPER_LIGHT, stroke_width=2),
            Arc(radius=0.55, start_angle=200 * DEGREES, angle=140 * DEGREES, color=COPPER_LIGHT, stroke_width=2).shift(DOWN * 1.15),
        ).shift(UP * 0.2)
        muscle_lines = VGroup(*[
            Line(UP * 1.15, UP * 1.68, color=COPPER, stroke_width=6).shift(RIGHT * x)
            for x in [-1.15, -0.75, -0.35, 0.35, 0.75, 1.15]
        ])
        motion_arrows = VGroup(*[
            Arrow(UP * 2.3 + RIGHT * x, UP * 1.8 + RIGHT * x, buff=0, color=COPPER_LIGHT, stroke_width=2)
            for x in [-0.75, 0, 0.75]
        ])
        skin_lines = VGroup(*[
            Arc(radius=1.35 + offset, start_angle=65 * DEGREES, angle=50 * DEGREES, color=LINE, stroke_width=2)
            for offset in [0, 0.22, 0.44]
        ]).shift(UP * 0.82)
        all_objects = VGroup(face, muscle_lines, motion_arrows, skin_lines)

        line, dot = self.progress_line()
        self.play(ShowCreation(face), dot.animate.move_to(line.point_from_proportion(0.2)), run_time=1.0)
        self.play(LaggedStartMap(GrowFromCenter, muscle_lines, lag_ratio=0.08), FadeIn(motion_arrows), run_time=0.8)
        self.play(FadeIn(skin_lines), dot.animate.move_to(line.point_from_proportion(0.55)), run_time=0.7)
        self.play(
            muscle_lines.animate.scale(0.58, about_edge=DOWN).set_opacity(0.55),
            FadeOut(motion_arrows),
            skin_lines.animate.set_opacity(0.35),
            dot.animate.move_to(line.point_from_proportion(0.92)),
            run_time=1.2,
        )
        self.finish_loop(VGroup(all_objects, line, dot))


class TreatmentBiostimulator(TreatmentScene):
    def construct(self):
        epidermis = RoundedRectangle(width=7.8, height=1.0, corner_radius=0.12, fill_color=ROSE, fill_opacity=1, stroke_width=0).shift(UP * 1.0)
        dermis = Rectangle(width=7.8, height=2.2, fill_color=SAND, fill_opacity=1, stroke_color=COPPER_LIGHT, stroke_width=1).shift(DOWN * 0.6)
        applicator = VGroup(
            Line(UP * 3.0, UP * 1.7, color=INK, stroke_width=3),
            Triangle(fill_color=INK, fill_opacity=1, stroke_width=0).scale(0.12).rotate(PI).shift(UP * 1.62),
        )
        particles = VGroup(*[
            Dot(point=[x, y, 0], radius=0.1, color=COPPER)
            for x, y in [(-2.7, 0), (-1.7, -0.5), (-0.7, 0), (0.7, -0.5), (1.7, 0), (2.7, -0.5)]
        ])
        fibers = VGroup(*[
            ParametricCurve(
                lambda t, y=y: [3.4 * (t - 0.5), y + 0.22 * np.sin(4 * PI * t), 0],
                t_range=[0, 1, 0.04],
                color=COPPER,
                stroke_width=3,
            )
            for y in [-1.25, -0.75, -0.25]
        ])
        all_objects = VGroup(epidermis, dermis, applicator, particles, fibers)

        line, dot = self.progress_line()
        self.play(FadeIn(epidermis), FadeIn(dermis), dot.animate.move_to(line.point_from_proportion(0.2)), run_time=0.8)
        self.play(FadeIn(applicator), run_time=0.35)
        self.play(LaggedStartMap(GrowFromCenter, particles, lag_ratio=0.12), dot.animate.move_to(line.point_from_proportion(0.48)), run_time=0.9)
        self.play(FadeOut(applicator), LaggedStartMap(ShowCreation, fibers, lag_ratio=0.2), dot.animate.move_to(line.point_from_proportion(0.9)), run_time=1.45)
        self.play(particles.animate.set_opacity(0.35), fibers.animate.set_stroke(width=4), run_time=0.55)
        self.finish_loop(VGroup(all_objects, line, dot))


class TreatmentFiller(TreatmentScene):
    def construct(self):
        profile = VMobject(color=INK, stroke_width=3)
        profile.set_points_smoothly([
            [-1.8, 2.6, 0], [-2.15, 1.5, 0], [-1.75, 0.65, 0], [-1.95, 0.1, 0],
            [-1.35, -0.5, 0], [-1.0, -1.25, 0], [-0.2, -2.1, 0], [0.6, -2.5, 0]
        ])
        guide = VMobject(color=COPPER_LIGHT, stroke_width=2)
        guide.set_points_smoothly([
            [-1.8, 2.6, 0], [-0.7, 2.7, 0], [0.4, 2.0, 0], [0.65, 0.9, 0],
            [0.35, 0.15, 0], [0.8, -0.75, 0], [0.6, -2.5, 0]
        ])
        points = VGroup(*[
            Dot(point, radius=0.13, color=ROSE).set_stroke(COPPER, width=2)
            for point in [(-1.65, 1.25, 0), (-1.83, 0.15, 0), (-1.08, -1.25, 0)]
        ])
        support_arcs = VGroup(*[
            Arc(radius=radius, start_angle=-65 * DEGREES, angle=125 * DEGREES, color=COPPER, stroke_width=4).move_arc_center_to(point)
            for radius, point in [(0.42, [-1.25, 1.2, 0]), (0.36, [-1.45, 0.05, 0]), (0.46, [-0.72, -1.2, 0])]
        ])
        arrows = VGroup(*[
            Arrow(point + RIGHT * 2.0, point + RIGHT * 0.65, buff=0.05, color=COPPER_LIGHT, stroke_width=2)
            for point in [np.array([-1.65, 1.25, 0]), np.array([-1.83, 0.15, 0]), np.array([-1.08, -1.25, 0])]
        ])
        all_objects = VGroup(profile, guide, points, support_arcs, arrows)

        line, dot = self.progress_line()
        self.play(ShowCreation(profile), ShowCreation(guide), dot.animate.move_to(line.point_from_proportion(0.2)), run_time=1.0)
        self.play(LaggedStartMap(GrowFromCenter, points, lag_ratio=0.15), FadeIn(arrows), dot.animate.move_to(line.point_from_proportion(0.5)), run_time=0.9)
        self.play(LaggedStartMap(ShowCreation, support_arcs, lag_ratio=0.15), arrows.animate.shift(LEFT * 0.45).set_opacity(0.25), dot.animate.move_to(line.point_from_proportion(0.9)), run_time=1.2)
        self.play(FadeOut(arrows), guide.animate.set_opacity(0.35), run_time=0.45)
        self.finish_loop(VGroup(all_objects, line, dot))


class TreatmentPeeling(TreatmentScene):
    def construct(self):
        base = Rectangle(width=8.2, height=2.0, fill_color=SAND, fill_opacity=1, stroke_color=COPPER_LIGHT, stroke_width=1).shift(DOWN * 0.6)
        surface = RoundedRectangle(width=8.2, height=0.9, corner_radius=0.12, fill_color=ROSE, fill_opacity=1, stroke_width=0).shift(UP * 0.85)
        old_surface = Line(LEFT * 4.0 + UP * 1.3, RIGHT * 4.0 + UP * 1.3, color=COPPER, stroke_width=4)
        lifted = Arc(radius=1.35, start_angle=15 * DEGREES, angle=145 * DEGREES, color=COPPER, stroke_width=4).shift(RIGHT * 1.9 + UP * 1.0)
        renewal_arrows = VGroup(*[
            Arrow(DOWN * 1.1 + RIGHT * x, UP * 0.25 + RIGHT * x, buff=0, color=COPPER_LIGHT, stroke_width=2)
            for x in [-2.5, -1.25, 0, 1.25, 2.5]
        ])
        new_surface = Line(LEFT * 4.0 + UP * 1.3, RIGHT * 4.0 + UP * 1.3, color=COPPER_LIGHT, stroke_width=5)
        all_objects = VGroup(base, surface, old_surface, lifted, renewal_arrows, new_surface)

        line, dot = self.progress_line()
        self.play(FadeIn(base), FadeIn(surface), ShowCreation(old_surface), dot.animate.move_to(line.point_from_proportion(0.2)), run_time=0.85)
        self.play(Transform(old_surface.copy(), lifted), FadeIn(renewal_arrows), dot.animate.move_to(line.point_from_proportion(0.55)), run_time=1.15)
        self.play(LaggedStartMap(GrowArrow, renewal_arrows, lag_ratio=0.08), run_time=0.55)
        self.play(ShowCreation(new_surface), FadeOut(lifted), FadeOut(renewal_arrows), surface.animate.set_fill(COPPER_LIGHT, opacity=0.35), dot.animate.move_to(line.point_from_proportion(0.92)), run_time=1.1)
        self.finish_loop(VGroup(all_objects, line, dot))


class TreatmentMicroneedling(TreatmentScene):
    def construct(self):
        epidermis = RoundedRectangle(width=8.0, height=0.9, corner_radius=0.12, fill_color=ROSE, fill_opacity=1, stroke_width=0).shift(UP * 0.8)
        dermis = Rectangle(width=8.0, height=2.0, fill_color=SAND, fill_opacity=1, stroke_color=COPPER_LIGHT, stroke_width=1).shift(DOWN * 0.65)
        needles = VGroup(*[
            VGroup(
                Line(UP * 2.9 + RIGHT * x, UP * 1.2 + RIGHT * x, color=INK, stroke_width=3),
                Triangle(fill_color=INK, fill_opacity=1, stroke_width=0).scale(0.1).rotate(PI).shift(UP * 1.12 + RIGHT * x),
            )
            for x in [-2.7, -1.8, -0.9, 0, 0.9, 1.8, 2.7]
        ])
        response_dots = VGroup(*[
            Dot([x, -0.35 - 0.35 * (index % 2), 0], radius=0.09, color=COPPER)
            for index, x in enumerate([-2.7, -1.8, -0.9, 0, 0.9, 1.8, 2.7])
        ])
        repair_fibers = VGroup(*[
            ParametricCurve(
                lambda t, y=y: [3.5 * (t - 0.5), y + 0.18 * np.sin(5 * PI * t), 0],
                t_range=[0, 1, 0.04],
                color=COPPER,
                stroke_width=3,
            )
            for y in [-1.3, -0.85]
        ])
        all_objects = VGroup(epidermis, dermis, needles, response_dots, repair_fibers)

        line, dot = self.progress_line()
        self.play(FadeIn(epidermis), FadeIn(dermis), dot.animate.move_to(line.point_from_proportion(0.2)), run_time=0.75)
        self.play(FadeIn(needles), run_time=0.35)
        self.play(needles.animate.shift(DOWN * 0.85), LaggedStartMap(GrowFromCenter, response_dots, lag_ratio=0.08), dot.animate.move_to(line.point_from_proportion(0.5)), run_time=0.85)
        self.play(needles.animate.shift(UP * 0.85).set_opacity(0.2), LaggedStartMap(ShowCreation, repair_fibers, lag_ratio=0.18), dot.animate.move_to(line.point_from_proportion(0.9)), run_time=1.25)
        self.play(FadeOut(needles), response_dots.animate.set_opacity(0.35), run_time=0.4)
        self.finish_loop(VGroup(all_objects, line, dot))
